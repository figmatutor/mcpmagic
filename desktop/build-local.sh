#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# MCP Magic - Local Desktop Build Helper
# =============================================================================
#
# Usage:
#   ./desktop/build-local.sh setup              # Clone + apply branding + npm ci
#   ./desktop/build-local.sh setup --skip-clone  # Reuse existing clone (re-apply branding only)
#
#   cd /tmp/mcpmagic-desktop && PLATFORM=mas npm run make -- --platform=mas --arch=universal
#   cd /tmp/mcpmagic-desktop && PLATFORM=msstore npm run make -- --platform=win32
#
#   ./desktop/build-local.sh clean              # Remove cloned directory
#   ./desktop/build-local.sh status             # Show current state
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BRANDING_DIR="$ROOT/desktop/branding"
METADATA="$BRANDING_DIR/metadata.json"
BUILD_DIR="/tmp/mcpmagic-desktop"
UPSTREAM="https://github.com/grab/TalkToFigmaDesktop"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${GREEN}[+]${NC} $*"; }
warn() { echo -e "${YELLOW}[!]${NC} $*"; }
err()  { echo -e "${RED}[x]${NC} $*"; }
info() { echo -e "${CYAN}[i]${NC} $*"; }

# ---------------------------------------------------------------------------
# setup: Clone upstream, apply branding, install deps
# ---------------------------------------------------------------------------
cmd_setup() {
  local skip_clone=false
  [[ "${1:-}" == "--skip-clone" ]] && skip_clone=true

  if ! command -v node &>/dev/null; then
    err "Node.js is required but not found"; exit 1
  fi

  # Step 1: Clone
  if [[ "$skip_clone" == true ]]; then
    if [[ ! -d "$BUILD_DIR" ]]; then
      err "$BUILD_DIR does not exist. Run without --skip-clone first."
      exit 1
    fi
    warn "Skipping clone, reusing existing $BUILD_DIR"
  else
    if [[ -d "$BUILD_DIR" ]]; then
      warn "Removing existing $BUILD_DIR"
      rm -rf "$BUILD_DIR"
    fi
    log "Cloning $UPSTREAM ..."
    git clone --depth=1 "$UPSTREAM" "$BUILD_DIR"
  fi

  # Step 2: Apply branding to package.json
  log "Applying branding to package.json ..."
  node -e "
    const fs = require('fs');
    const meta = JSON.parse(fs.readFileSync('$METADATA', 'utf8'));
    const pkgPath = '$BUILD_DIR/package.json';
    const p = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    p.name = meta.appName.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    p.productName = meta.productName;
    p.description = meta.description;
    fs.writeFileSync(pkgPath, JSON.stringify(p, null, 2));
    console.log('  name:', p.name);
    console.log('  productName:', p.productName);
  "

  # Step 3: Apply branding to forge.config.ts
  log "Applying branding to forge.config.ts ..."
  node -e "
    const fs = require('fs');
    const meta = JSON.parse(fs.readFileSync('$METADATA', 'utf8'));
    const forgePath = '$BUILD_DIR/forge.config.ts';
    let c = fs.readFileSync(forgePath, 'utf8');
    c = c.replace(/appBundleId:\s*'[^']*'/, \`appBundleId: '\${meta.bundleId}'\`);
    c = c.replace(/name:\s*'[^']*'/, \`name: '\${meta.productName}'\`);
    c = c.replace(/executableName:\s*'[^']*'/, \`executableName: '\${meta.productName.toLowerCase().replace(/[^a-z0-9.-]/g, \"-\")}'\`);
    fs.writeFileSync(forgePath, c);
    console.log('  bundleId:', meta.bundleId);
    console.log('  name:', meta.productName);
  "

  # Step 3.5: Apply metadata-based text branding
  log "Applying metadata-based text branding ..."
  node -e "
    const fs = require('fs');
    const path = require('path');
    const meta = JSON.parse(fs.readFileSync('$METADATA', 'utf8'));
    const projectRoot = '$BUILD_DIR';

    const productName = meta.productName || meta.appName || 'MCP Magic';
    const terminalProductName = meta.terminalProductName || productName.toUpperCase();
    const deepLinkScheme = (meta.deepLinkScheme || meta.appName || productName)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

    const replaceInFile = (relPath, replacements) => {
      const filePath = path.join(projectRoot, relPath);
      if (!fs.existsSync(filePath)) return;
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      for (const [from, to] of replacements) {
        if (content.includes(from)) {
          content = content.split(from).join(to);
          changed = true;
        }
      }
      if (changed) fs.writeFileSync(filePath, content);
    };

    replaceInFile('index.html', [
      ['<title>Talk To Figma</title>', '<title>' + productName + '</title>'],
    ]);

    replaceInFile('src/App.tsx', [
      ['TalkToFigma Desktop v2.0.0', terminalProductName + ' Desktop v2.0.0'],
      ['talktofigma://', deepLinkScheme + '://'],
    ]);

    replaceInFile('src/components/app-sidebar.tsx', [
      ['alt=\"TalkToFigma\"', 'alt=\"' + productName + '\"'],
      ['>TalkToFigma</span>', '>' + productName + '</span>'],
    ]);

    replaceInFile('src/pages/Settings.tsx', [
      ['Configure TalkToFigma Desktop with your preferred MCP client', 'Configure ' + productName + ' with your preferred MCP client'],
    ]);

    replaceInFile('src/pages/Help.tsx', [
      ['Learn how to use TalkToFigma Desktop with our interactive tutorial', 'Learn how to use ' + productName + ' with our interactive tutorial'],
      ['Follow our step-by-step tutorial to get started with TalkToFigma Desktop.', 'Follow our step-by-step tutorial to get started with ' + productName + '.'],
    ]);
  "

  # Step 4: Copy icon assets
  log "Copying icon assets ..."
  mkdir -p "$BUILD_DIR/public"
  cp "$BRANDING_DIR/icon.icns" "$BUILD_DIR/public/icon.icns"
  cp "$BRANDING_DIR/icon.ico"  "$BUILD_DIR/public/icon.ico"
  cp "$BRANDING_DIR/icon.png"  "$BUILD_DIR/public/icon.png"
  cp "$BRANDING_DIR/trayTemplate.png" "$BUILD_DIR/public/trayTemplate.png"
  cp "$BRANDING_DIR/trayTemplate_active.png" "$BUILD_DIR/public/trayTemplate_active.png"
  cp "$BRANDING_DIR/tray_dark.png" "$BUILD_DIR/public/tray_dark.png"
  cp "$BRANDING_DIR/tray_dark_active.png" "$BUILD_DIR/public/tray_dark_active.png"
  if [[ -d "$BRANDING_DIR/icon.iconset" ]]; then
    cp -R "$BRANDING_DIR/icon.iconset" "$BUILD_DIR/public/"
  fi

  # Step 5: Copy .env if it exists (for local signing credentials)
  if [[ -f "$ROOT/desktop/.env" ]]; then
    log "Copying .env for local signing ..."
    cp "$ROOT/desktop/.env" "$BUILD_DIR/.env"
  fi

  # Step 6: npm ci
  if [[ "$skip_clone" == false ]]; then
    log "Installing dependencies (npm ci) ..."
    (cd "$BUILD_DIR" && npm ci)
  else
    warn "Skipping npm ci (--skip-clone mode). Run 'npm ci' manually if needed."
  fi

  echo ""
  log "Setup complete!"
  echo ""
  info "Build directory: $BUILD_DIR"
  info "Version: $(node -p "require('$BUILD_DIR/package.json').version")"
  echo ""
  echo -e "${CYAN}Next steps - run one of:${NC}"
  echo ""
  echo "  # MAS (Mac App Store) build:"
  echo "  cd $BUILD_DIR && PLATFORM=mas npm run make -- --platform=mas --arch=universal"
  echo ""
  echo "  # MAS arm64 only (faster):"
  echo "  cd $BUILD_DIR && PLATFORM=mas npm run make -- --platform=mas --arch=arm64"
  echo ""
  echo "  # MSIX (Windows Store) build:"
  echo "  cd $BUILD_DIR && PLATFORM=msstore npm run make -- --platform=win32"
  echo ""
  echo -e "${CYAN}When done:${NC}"
  echo "  $0 clean"
  echo ""
}

# ---------------------------------------------------------------------------
# clean: Remove the build directory
# ---------------------------------------------------------------------------
cmd_clean() {
  if [[ -d "$BUILD_DIR" ]]; then
    log "Removing $BUILD_DIR ..."
    rm -rf "$BUILD_DIR"
    log "Cleaned up."
  else
    info "Nothing to clean. $BUILD_DIR does not exist."
  fi
}

# ---------------------------------------------------------------------------
# status: Show current state
# ---------------------------------------------------------------------------
cmd_status() {
  echo ""
  if [[ -d "$BUILD_DIR" ]]; then
    info "Build directory: $BUILD_DIR (exists)"
    info "Version: $(node -p "require('$BUILD_DIR/package.json').version" 2>/dev/null || echo 'unknown')"
    info "Product: $(node -p "require('$BUILD_DIR/package.json').productName" 2>/dev/null || echo 'unknown')"

    if [[ -d "$BUILD_DIR/out/make" ]]; then
      info "Artifacts:"
      find "$BUILD_DIR/out/make" -type f \( -name "*.pkg" -o -name "*.msix" -o -name "*.dmg" \) | while read -r f; do
        local size
        size=$(du -h "$f" | cut -f1)
        echo "       $f ($size)"
      done
    else
      warn "No build artifacts yet."
    fi
  else
    info "Build directory: $BUILD_DIR (not found)"
    info "Run '$0 setup' to get started."
  fi
  echo ""
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
case "${1:-help}" in
  setup)  cmd_setup "${2:-}" ;;
  clean)  cmd_clean ;;
  status) cmd_status ;;
  *)
    echo "Usage: $0 {setup|clean|status}"
    echo ""
    echo "  setup [--skip-clone]  Clone upstream and apply MCP Magic branding"
    echo "  clean                 Remove the build directory"
    echo "  status                Show current state and artifacts"
    ;;
esac
