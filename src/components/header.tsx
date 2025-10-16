"use client";

import * as React from "react";
import Image from "next/image";
import { Github, ExternalLink, Plus } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MCPLogo } from "@/components/mcp-logo";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import LanguageToggle from "@/components/language-toggle";

export default function Header() {
  const t = useTranslations('header');
  
  const resources = [
    {
      title: t('resources_items.english_playground.title'),
      href: "https://www.figma.com/community/file/1513760524697897204",
      description: t('resources_items.english_playground.description'),
    },
    {
      title: t('resources_items.korean_playground.title'),
      href: "https://www.figma.com/community/file/1513759391089024242",
      description: t('resources_items.korean_playground.description'),
    },
    {
      title: t('resources_items.tutorial_videos.title'),
      href: "https://youtube.com/playlist?list=PLLQlZaiiGlHOdfqGoErLQaMaDPZdHARVV&si=uCGpp7BwXerIhtbV",
      description: t('resources_items.tutorial_videos.description'),
    },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 dark:bg-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <MCPLogo 
            className="h-7 w-auto text-black dark:text-white"
          />
        </Link>

        {/* Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                {t('resources')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  {resources.map((resource) => (
                    <ListItem
                      key={resource.title}
                      title={resource.title}
                      href={resource.href}
                    >
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/prompts" className="text-sm">
                  {t('prompts')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:inline-flex"
          >
            <a
              href="https://github.com/figmatutor/mcpmagic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              {t('github')}
            </a>
          </Button>
          <LanguageToggle />
          <ThemeToggle />
               <Button
                 size="sm"
                 onClick={() =>
                   window.open(
                     "https://github.com/figmatutor/mcpmagic/issues/new",
                     "_blank",
                     "noopener,noreferrer",
                   )
                 }
                 className="bg-[rgb(58,94,251)] hover:bg-[rgb(48,84,241)] text-white rounded-[32px] px-5 h-9 text-sm font-semibold transition-all duration-200"
               >
                 <Plus className="h-4 w-4" />
                 {t('feedback')}
               </Button>
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
        >
          <div className="text-sm font-medium leading-none flex items-center">
            {title}
            <ExternalLink className="h-3 w-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
