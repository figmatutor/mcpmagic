"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PromptCard from "@/components/prompt-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  X,
  Filter,
  Globe,
  Wand2,
  MessageSquare,
  RefreshCw,
  GitBranch,
  Palette,
} from "lucide-react";

interface Prompt {
  slug: string;
  title: string;
  category: string;
  language: string;
  tags: string[];
  content?: string;
}

interface PromptClientProps {
  prompts: Prompt[];
}

const categories = [
  { id: "auto-populate", titleKey: "auto-populate", icon: Wand2 },
  { id: "annotation", titleKey: "annotation", icon: MessageSquare },
  { id: "overrides", titleKey: "override", icon: RefreshCw },
  { id: "connectors", titleKey: "connector", icon: GitBranch },
  { id: "vibe-design", titleKey: "vibe-design", icon: Palette },
];

const languages = ["English", "한국어", "中文"];

export default function PromptClient({ prompts }: PromptClientProps) {
  const t = useTranslations('prompts_page');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL에서 초기값 읽어오기
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // URL 업데이트 함수
  const updateURL = useCallback(
    (
      newCategories: string[],
      newLanguages: string[],
      newTags: string[],
      newSearchQuery: string,
    ) => {
      const params = new URLSearchParams();

      if (newCategories.length > 0) {
        params.set("category", newCategories.join(","));
      }
      if (newLanguages.length > 0) {
        params.set("language", newLanguages.join(","));
      }
      if (newTags.length > 0) {
        params.set("tags", newTags.join(","));
      }
      if (newSearchQuery) {
        params.set("search", newSearchQuery);
      }

      const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(newURL, { scroll: false });
    },
    [router, pathname],
  );

  // 초기 URL에서 상태 설정
  useEffect(() => {
    const categories =
      searchParams.get("category")?.split(",").filter(Boolean) || [];
    const languages =
      searchParams.get("language")?.split(",").filter(Boolean) || [];
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const search = searchParams.get("search") || "";

    setSelectedCategories(categories);
    setSelectedLanguages(languages);
    setSelectedTags(tags);
    setSearchQuery(search);
  }, [searchParams]);

  // 모든 태그 수집
  const allTags = Array.from(new Set(prompts.flatMap((p) => p.tags)));

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(prompt.category);
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(prompt.language);
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => prompt.tags.includes(tag));
    const matchesSearch =
      !searchQuery ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesLanguage && matchesTags && matchesSearch;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

  // 필터가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedLanguages, selectedTags, searchQuery]);

  const handleTagToggle = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    updateURL(selectedCategories, selectedLanguages, newTags, searchQuery);
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(newCategories);
    updateURL(newCategories, selectedLanguages, selectedTags, searchQuery);
  };

  const handleLanguageToggle = (language: string, checked: boolean) => {
    const newLanguages = checked
      ? [...selectedLanguages, language]
      : selectedLanguages.filter((lang) => lang !== language);
    setSelectedLanguages(newLanguages);
    updateURL(selectedCategories, newLanguages, selectedTags, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(selectedCategories, selectedLanguages, selectedTags, value);
  };

  // Filter Section Component
  const FilterSection = ({ className = "" }: { className?: string }) => (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter by
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Choose a category</Label>
            {selectedCategories.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedCategories([]);
                  updateURL([], selectedLanguages, selectedTags, searchQuery);
                }}
                className="h-auto p-0 text-xs text-primary"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryToggle(category.id, !!checked)
                  }
                />

                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal flex items-center gap-2"
                >
                  <category.icon className="h-3 w-3" />
                  {t(`categories.${category.titleKey}`)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Language</Label>
            {selectedLanguages.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedLanguages([]);
                  updateURL(selectedCategories, [], selectedTags, searchQuery);
                }}
                className="h-auto p-0 text-xs text-primary"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {languages
              .slice(0, showMoreLanguages ? languages.length : 5)
              .map((language) => (
                <div
                  key={language}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`lang-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) =>
                      handleLanguageToggle(language, !!checked)
                    }
                  />

                  <Label
                    htmlFor={`lang-${language}`}
                    className="text-sm font-normal"
                  >
                    {language}
                  </Label>
                </div>
              ))}
            {languages.length > 5 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowMoreLanguages(!showMoreLanguages)}
                className="h-auto p-0 text-xs text-muted-foreground"
              >
                {showMoreLanguages ? "Less" : "More"}
              </Button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Tags</Label>
            {selectedTags.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedTags([]);
                  updateURL(
                    selectedCategories,
                    selectedLanguages,
                    [],
                    searchQuery,
                  );
                }}
                className="h-auto p-0 text-xs text-primary"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {allTags.slice(0, showMoreTags ? allTags.length : 5).map((tag) => (
              <div
                key={tag}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) => handleTagToggle(tag, !!checked)}
                />

                <Label
                  htmlFor={tag}
                  className="text-sm font-normal"
                >
                  {tag}
                </Label>
              </div>
            ))}
            {allTags.length > 5 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowMoreTags(!showMoreTags)}
                className="h-auto p-0 text-xs text-muted-foreground"
              >
                {showMoreTags ? "Less" : "More"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full">
      {/* Page Title and Description */}
      <div className="text-center mb-16">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Left Sidebar - Filters */}
          <div
            className="hidden lg:block w-80 flex-shrink-0"
          >
            <FilterSection className="sticky top-8" />
          </div>

          {/* Right Content - Prompt Cards */}
          <div className="flex-1">
            <div className="mb-6">
              {/* Mobile Filter Button */}
              <div
                className="flex items-center justify-between mb-4 lg:hidden"
              >
                <h2
                  className="text-2xl font-semibold tracking-tight"
                >
                  {filteredPrompts.length} Prompts
                </h2>
                <Sheet
                  open={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      {selectedCategories.length +
                        selectedLanguages.length +
                        selectedTags.length >
                        0 && (
                        <Badge
                          variant="secondary"
                          className="ml-1 px-1.5 py-0.5 text-xs"
                        >
                          {selectedCategories.length +
                            selectedLanguages.length +
                            selectedTags.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-80 overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Filter prompts by category, language, and tags
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSection />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block">
                <h2
                  className="text-2xl font-semibold tracking-tight"
                >
                  {filteredPrompts.length} Prompts
                  {totalPages > 1 && (
                    <span
                      className="text-sm font-normal text-muted-foreground ml-2"
                    >
                      (Page {currentPage} of {totalPages})
                    </span>
                  )}
                </h2>
              </div>

              <p className="text-muted-foreground">
                Explore our curated collection of Figma MCP prompts
                {prompts.length !== filteredPrompts.length && (
                  <span className="block text-sm mt-1">
                    Showing {paginatedPrompts.length} of{" "}
                    {filteredPrompts.length} filtered results from{" "}
                    {prompts.length} total prompts
                  </span>
                )}
              </p>

              {/* Search */}
              <div className="mt-4 space-y-3">
                <div className="relative max-w-md">
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />

                  <Input
                    placeholder={t('filters.search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Selected Filters as Chips */}
                {(selectedCategories.length > 0 ||
                  selectedLanguages.length > 0 ||
                  selectedTags.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.id === categoryId,
                      );
                      return (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {category?.icon && (
                            <category.icon
                              className="h-3 w-3"
                            />
                          )}
                          <span>{category?.titleKey && t(`categories.${category.titleKey}`)}</span>
                          <button
                            onClick={() =>
                              handleCategoryToggle(categoryId, false)
                            }
                            className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                            aria-label="Remove category filter"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}

                    {selectedLanguages.map((language) => (
                      <Badge
                        key={language}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        <span>{language}</span>
                        <button
                          onClick={() => handleLanguageToggle(language, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          aria-label="Remove language filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}

                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleTagToggle(tag, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          aria-label="Remove tag filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.slug}
                  prompt={prompt}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
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
                          currentPage <= 1
                            ? "pointer-events-none opacity-50"
                            : ""
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

            {filteredPrompts.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4 opacity-50">
                  🔍
                </div>
                <CardTitle className="mb-2">
                  No prompts found
                </CardTitle>
                <CardDescription>
                  Try adjusting your filters or search query to find what
                  you&apos;re looking for.
                </CardDescription>
              </Card>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

