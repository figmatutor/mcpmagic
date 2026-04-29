#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--')) continue;

    const key = arg.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = value;
    index += 1;
  }

  return parsed;
}

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required file not found: ${filePath}`);
  }
}

function readFile(filePath) {
  ensureFile(filePath);
  return fs.readFileSync(filePath, 'utf8');
}

function writeFileIfChanged(filePath, nextContent) {
  const prevContent = readFile(filePath);
  if (prevContent !== nextContent) {
    fs.writeFileSync(filePath, nextContent);
    return true;
  }
  return false;
}

function replaceRegex(content, pattern, replacement) {
  return content.replace(pattern, replacement);
}

function replaceLiteral(content, from, to) {
  return content.split(from).join(to);
}

function copyIfExists(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) return false;

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.cpSync(sourcePath, targetPath, { recursive: true, force: true });
  return true;
}

function sanitizeExecutableName(value) {
  return value.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
}

function sanitizeServerName(value) {
  const sanitized = value.replace(/[^A-Za-z0-9]/g, '');
  return sanitized || 'MCPMagic';
}

function sanitizeScheme(value) {
  const sanitized = value.toLowerCase().replace(/[^a-z0-9]/g, '');
  return sanitized || 'mcpmagic';
}

function replaceInProject(projectRoot, relPath, updater) {
  const filePath = path.join(projectRoot, relPath);
  if (!fs.existsSync(filePath)) return false;

  const current = fs.readFileSync(filePath, 'utf8');
  const next = updater(current);

  if (next !== current) {
    fs.writeFileSync(filePath, next);
    return true;
  }

  return false;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = path.resolve(args['repo-root'] || process.cwd());
  const projectRoot = path.resolve(args['project-root'] || process.cwd());
  const target = String(args.target || 'local');

  const metadataPath = path.join(repoRoot, 'desktop', 'branding', 'metadata.json');
  const meta = JSON.parse(readFile(metadataPath));

  const productName = meta.productName || meta.appName || 'MCP Magic';
  const shortName = meta.shortName || productName;
  const terminalProductName = meta.terminalProductName || productName.toUpperCase();
  const internalName = sanitizeExecutableName(meta.internalName || meta.appName || productName);
  const mcpServerName = sanitizeServerName(meta.mcpServerName || productName);
  const mcpServerDirName = meta.mcpServerDirName || productName;
  const deepLinkScheme = sanitizeScheme(meta.deepLinkScheme || meta.appName || productName);
  const repositoryUrl = meta.repositoryUrl || 'https://github.com/figmatutor/mcpmagic';
  const normalizedRepositoryUrl = repositoryUrl.replace(/\/$/, '');
  const issuesUrl = meta.issuesUrl || `${normalizedRepositoryUrl}/issues`;
  const readmeUrl = `${normalizedRepositoryUrl}/blob/main/README.md`;

  const updatedFiles = [];

  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFile(packageJsonPath));
  if (target !== 'msix') {
    packageJson.name = internalName;
    packageJson.productName = productName;
  }
  packageJson.description = meta.description || packageJson.description;
  packageJson.branding = {
    ...(packageJson.branding || {}),
    shortName,
    mcpServerName,
    mcpServerDirName,
    deepLinkScheme,
  };
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  updatedFiles.push('package.json');

  if (target !== 'msix') {
    const forgePath = path.join(projectRoot, 'forge.config.ts');
    let forgeContent = readFile(forgePath);
    forgeContent = replaceRegex(
      forgeContent,
      /appBundleId:\s*['"][^'"]*['"]/,
      `appBundleId: '${meta.bundleId}'`,
    );
    forgeContent = replaceRegex(
      forgeContent,
      /name:\s*['"][^'"]*['"]/,
      `name: '${productName}'`,
    );
    forgeContent = replaceRegex(
      forgeContent,
      /executableName:\s*['"][^'"]*['"]/,
      `executableName: '${internalName}'`,
    );
    writeFileIfChanged(forgePath, forgeContent);
    updatedFiles.push('forge.config.ts');
  }

  const textPatchFiles = [
    'index.html',
    'src/App.tsx',
    'src/components/app-sidebar.tsx',
    'src/pages/Help.tsx',
    'src/main/menu.ts',
    'src/shared/i18n.ts',
    'src/shared/branding.ts',
    'src/main/figma/oauth/FigmaOAuthService.ts',
    'src/main/server/SseDetectionServer.ts',
    'src/main/server/services/channel-service.ts',
    'src/main/server/TalkToFigmaWebSocketServer.ts',
    'src/main/server/websocket-server.ts',
  ];

  for (const relPath of textPatchFiles) {
    const changed = replaceInProject(projectRoot, relPath, (content) => {
      let next = content;

      if (relPath === 'index.html') {
        next = replaceLiteral(next, '<title>Talk To Figma</title>', `<title>${productName}</title>`);
      }

      if (relPath === 'src/App.tsx') {
        next = replaceRegex(
          next,
          /TalkToFigma Desktop v\$\{__APP_VERSION__\}/g,
          () => `${terminalProductName} Desktop v\${__APP_VERSION__}`,
        );
        next = replaceLiteral(next, 'talktofigma://', `${deepLinkScheme}://`);
      }

      if (relPath === 'src/components/app-sidebar.tsx') {
        next = replaceLiteral(next, 'alt="TalkToFigma"', `alt="${shortName}"`);
        next = replaceLiteral(next, '>TalkToFigma</span>', `>${shortName}</span>`);
      }

      if (relPath === 'src/pages/Help.tsx') {
        next = replaceLiteral(next, 'https://github.com/grab/TalkToFigmaDesktop/issues', issuesUrl);
        next = replaceLiteral(next, 'https://github.com/grab/TalkToFigmaDesktop', repositoryUrl);
      }

      if (relPath === 'src/main/menu.ts') {
        next = replaceLiteral(next, 'https://github.com/grab/TalkToFigmaDesktop/issues', issuesUrl);
        next = replaceLiteral(next, 'https://github.com/grab/TalkToFigmaDesktop/blob/main/README.md', readmeUrl);
        next = replaceLiteral(next, 'https://github.com/grab/TalkToFigmaDesktop', repositoryUrl);
      }

      if (relPath === 'src/shared/i18n.ts') {
        next = replaceRegex(next, /\bTalkToFigma Desktop\b/g, productName);
        next = replaceRegex(next, /\bTalk To Figma\b/g, shortName);
        next = replaceRegex(next, /\bTalkToFigma\b/g, shortName);
      }

      if (relPath === 'src/shared/branding.ts') {
        next = replaceLiteral(next, "return sanitized || 'TalkToFigmaDesktop';", `return sanitized || '${mcpServerName}';`);
        next = replaceLiteral(next, "return sanitized || 'talktofigma';", `return sanitized || '${deepLinkScheme}';`);
        next = replaceLiteral(next, "productName: packagedMetadata.productName || 'TalkToFigma Desktop',", `productName: packagedMetadata.productName || '${productName}',`);
        next = replaceLiteral(next, "shortName: branding.shortName || 'TalkToFigma',", `shortName: branding.shortName || '${shortName}',`);
        next = replaceLiteral(next, "mcpServerDirName: branding.mcpServerDirName || 'TalkToFigma',", `mcpServerDirName: branding.mcpServerDirName || '${mcpServerDirName}',`);
      }

      if (relPath === 'src/main/figma/oauth/FigmaOAuthService.ts') {
        next = replaceLiteral(next, 'return to the TalkToFigma Desktop app.', `return to the ${productName} app.`);
      }

      if (relPath === 'src/main/server/SseDetectionServer.ts') {
        next = replaceLiteral(next, 'Open TalkToFigma Desktop and go to Settings to get the new configuration.', `Open ${productName} and go to Settings to get the new configuration.`);
        next = replaceLiteral(next, 'stdio (see TalkToFigma Desktop → Settings)', `stdio (see ${productName} -> Settings)`);
      }

      if (
        relPath === 'src/main/server/services/channel-service.ts' ||
        relPath === 'src/main/server/TalkToFigmaWebSocketServer.ts' ||
        relPath === 'src/main/server/websocket-server.ts'
      ) {
        next = replaceLiteral(next, 'Open TalkToFigma plugin in Figma.', `Open ${shortName} in Figma.`);
        next = replaceLiteral(next, 'Please open TalkToFigma plugin in Figma.', `Please open ${shortName} in Figma.`);
      }

      return next;
    });

    if (changed) {
      updatedFiles.push(relPath);
    }
  }

  const brandingDir = path.join(repoRoot, 'desktop', 'branding');
  const publicDir = path.join(projectRoot, 'public');
  fs.mkdirSync(publicDir, { recursive: true });

  copyIfExists(path.join(brandingDir, 'icon.icns'), path.join(publicDir, 'icon.icns'));
  copyIfExists(path.join(brandingDir, 'icon.ico'), path.join(publicDir, 'icon.ico'));
  copyIfExists(path.join(brandingDir, 'icon.png'), path.join(publicDir, 'icon.png'));
  copyIfExists(path.join(brandingDir, 'trayTemplate.png'), path.join(publicDir, 'trayTemplate.png'));
  copyIfExists(path.join(brandingDir, 'trayTemplate_active.png'), path.join(publicDir, 'trayTemplate_active.png'));
  copyIfExists(path.join(brandingDir, 'tray_dark.png'), path.join(publicDir, 'tray_dark.png'));
  copyIfExists(path.join(brandingDir, 'tray_dark_active.png'), path.join(publicDir, 'tray_dark_active.png'));
  copyIfExists(path.join(brandingDir, 'icon.iconset'), path.join(publicDir, 'icon.iconset'));
  copyIfExists(path.join(brandingDir, 'windows'), path.join(publicDir, 'assets', 'windows'));

  console.log(`[apply-branding] target=${target}`);
  console.log(`[apply-branding] productName=${productName}`);
  console.log(`[apply-branding] shortName=${shortName}`);
  console.log(`[apply-branding] repositoryUrl=${repositoryUrl}`);
  console.log(`[apply-branding] issuesUrl=${issuesUrl}`);
  console.log(`[apply-branding] updated ${updatedFiles.length} files`);
}

main();
