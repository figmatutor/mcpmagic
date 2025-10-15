"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Users, ExternalLink } from "lucide-react";

interface Contributor {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const CONTRIBUTORS_PER_PAGE = 8;

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/dusskapark/figma-mcp-prompts/contributors",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (response.ok) {
          const contributorsData = await response.json();

          // 각 컨트리뷰터의 상세 정보(이름) 가져오기
          const contributorsWithNames = await Promise.all(
            contributorsData.map(async (contributor: Contributor) => {
              try {
                const userResponse = await fetch(
                  `https://api.github.com/users/${contributor.login}`,
                  {
                    headers: {
                      Accept: "application/vnd.github.v3+json",
                    },
                  },
                );

                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  return {
                    ...contributor,
                    name: userData.name || contributor.login,
                  };
                }
              } catch (error) {
                console.error(
                  `Failed to fetch user data for ${contributor.login}:`,
                  error,
                );
              }

              return {
                ...contributor,
                name: contributor.login,
              };
            }),
          );

          setContributors(contributorsWithNames);
        }
      } catch (error) {
        console.error("Failed to fetch contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(contributors.length / CONTRIBUTORS_PER_PAGE);
  const startIndex = (currentPage - 1) * CONTRIBUTORS_PER_PAGE;
  const endIndex = startIndex + CONTRIBUTORS_PER_PAGE;
  const paginatedContributors = contributors.slice(startIndex, endIndex);

  if (loading) {
    return (
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-[rgb(58,94,251)] border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-white/60">
              Loading contributors...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2 text-white">
            <Users className="h-6 w-6" />
            Contributors
          </h2>
          <p className="text-white/60 mt-2">
            Thank you to all the amazing people who have contributed to this
            project
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {paginatedContributors.map((contributor) => (
            <Card
              key={contributor.id}
              className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              onClick={() => window.open(contributor.html_url, "_blank")}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={contributor.avatar_url}
                      alt={contributor.name || contributor.login}
                    />

                    <AvatarFallback className="bg-[rgb(58,94,251)] text-white">
                      {(contributor.name || contributor.login)
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm truncate text-white">
                        {contributor.name || contributor.login}
                      </h3>
                      <ExternalLink className="h-3 w-3 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {/* <Badge variant="secondary" className="text-xs">
                      {contributor.contributions} commits
                      </Badge> */}
                      {contributor.name &&
                        contributor.name !== contributor.login && (
                          <Badge variant="outline" className="text-xs bg-transparent border-white/20 text-white/70">
                            @{contributor.login}
                          </Badge>
                        )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href="https://github.com/dusskapark/figma-mcp-prompts/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[rgb(58,94,251)] transition-colors"
          >
            View all contributors on GitHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
