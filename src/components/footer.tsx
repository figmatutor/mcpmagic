import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Made by section */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-white/60">
              <span>Made with by</span>

              <a
                href="https://www.linkedin.com/in/dusskapark/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-[rgb(58,94,251)] transition-colors"
              >
                <span className="font-medium">Jude</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-white/60">&</span>
              <a
                href="https://www.instagram.com/figma_tutor/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-[rgb(58,94,251)] transition-colors"
              >
                <span className="font-medium">Figma tutor</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-white/10"></div>

          {/* Supported by section */}
          <div className="text-center space-y-4">
            <p className="text-sm text-white/60">Supported by</p>
            <div className="flex items-center justify-center gap-8">
              {/* Friends of Figma Seoul */}
              <a
                href="https://friends.figma.com/seoul/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-white/20">
                  <Image
                    src="/logo/fof-seoul.jpeg"
                    alt="Friends of Figma Seoul"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-white group-hover:text-[rgb(58,94,251)] transition-colors">
                    Friends of Figma
                  </div>
                  <div className="text-xs text-white/60">Seoul</div>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-xs text-white/60 text-center">
            <p>
              © 2025 Figma MCP Magic. Open source project for the design
              community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
