"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  { id: "auto-populate", title: "Auto Populate", icon: Wand2 },
  { id: "annotation", title: "Annotation", icon: MessageSquare },
  { id: "overrides", title: "Overrides", icon: RefreshCw },
  { id: "connectors", title: "Connectors", icon: GitBranch },
  { id: "vibe-design", title: "Vibe Design", icon: Palette },
];

const languages = ["English", "한국어", "中文"];

export default function PromptClient({ prompts }: PromptClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

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

      const newURL = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newURL, { scroll: false });
    },
    [router],
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

  // 디버깅을 위한 console.log
  console.log("Pagination Debug:", {
    totalPrompts: prompts.length,
    filteredPrompts: filteredPrompts.length,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedPrompts: paginatedPrompts.length,
    ITEMS_PER_PAGE,
  });

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
    <Card className={className} data-oid="ld4o61l">
      <CardHeader data-oid="xli:__4">
        <CardTitle className="flex items-center gap-2" data-oid="x11mk61">
          <Filter className="h-4 w-4" data-oid="nxpkjay" />
          Filter by
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6" data-oid="d7r9-7n">
        {/* Categories */}
        <div className="space-y-3" data-oid="r-e7spd">
          <div className="flex items-center justify-between" data-oid="whm8ls_">
            <Label data-oid="80kp0w2">Choose a category</Label>
            {selectedCategories.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedCategories([]);
                  updateURL([], selectedLanguages, selectedTags, searchQuery);
                }}
                className="h-auto p-0 text-xs text-primary"
                data-oid="efni::w"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2" data-oid="cczb8t:">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center space-x-2"
                data-oid="mhbesf0"
              >
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryToggle(category.id, !!checked)
                  }
                  data-oid="5gvlj-j"
                />

                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal flex items-center gap-2"
                  data-oid="ip76j2j"
                >
                  <category.icon className="h-3 w-3" data-oid="4qimyit" />

                  {category.title}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3" data-oid="08r7h5o">
          <div className="flex items-center justify-between" data-oid="82t-h:8">
            <Label data-oid="uwck-km">Language</Label>
            {selectedLanguages.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedLanguages([]);
                  updateURL(selectedCategories, [], selectedTags, searchQuery);
                }}
                className="h-auto p-0 text-xs text-primary"
                data-oid=":rknpz:"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2" data-oid="cend5jd">
            {languages
              .slice(0, showMoreLanguages ? languages.length : 5)
              .map((language) => (
                <div
                  key={language}
                  className="flex items-center space-x-2"
                  data-oid="smzyvy0"
                >
                  <Checkbox
                    id={`lang-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) =>
                      handleLanguageToggle(language, !!checked)
                    }
                    data-oid="c7yhysw"
                  />

                  <Label
                    htmlFor={`lang-${language}`}
                    className="text-sm font-normal"
                    data-oid="b.9gz1p"
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
                data-oid="l4rmwjv"
              >
                {showMoreLanguages ? "Less" : "More"}
              </Button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3" data-oid="nc12xa3">
          <div className="flex items-center justify-between" data-oid="lhavka4">
            <Label data-oid="4.:vw_:">Tags</Label>
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
                data-oid="c_zrl1w"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2" data-oid="gv1w34w">
            {allTags.slice(0, showMoreTags ? allTags.length : 5).map((tag) => (
              <div
                key={tag}
                className="flex items-center space-x-2"
                data-oid="fpjovm:"
              >
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) => handleTagToggle(tag, !!checked)}
                  data-oid="jb.glfp"
                />

                <Label
                  htmlFor={tag}
                  className="text-sm font-normal"
                  data-oid="4.jwmx:"
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
                data-oid="r1t9ex5"
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
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-8" data-oid="5-gghe9">
          {/* Desktop Left Sidebar - Filters */}
          <div
            className="hidden lg:block w-80 flex-shrink-0"
            data-oid="ghkhg5q"
          >
            <FilterSection className="sticky top-8" data-oid="uru5jg-" />
          </div>

          {/* Right Content - Prompt Cards */}
          <div className="flex-1" data-oid="v75jlv.">
            <div className="mb-6" data-oid="bsft40b">
              {/* Mobile Filter Button */}
              <div
                className="flex items-center justify-between mb-4 lg:hidden"
                data-oid="l1ndys:"
              >
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  data-oid="96exti-"
                >
                  {filteredPrompts.length} Prompts
                </h2>
                <Sheet
                  open={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                  data-oid="a896z:0"
                >
                  <SheetTrigger asChild data-oid="jcbj9uc">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      data-oid="8rv95zw"
                    >
                      <Filter className="h-4 w-4" data-oid="-n9e.mh" />
                      Filters
                      {selectedCategories.length +
                        selectedLanguages.length +
                        selectedTags.length >
                        0 && (
                        <Badge
                          variant="secondary"
                          className="ml-1 px-1.5 py-0.5 text-xs"
                          data-oid="iqorm15"
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
                    data-oid="j1w9h3b"
                  >
                    <SheetHeader data-oid="sklw0:r">
                      <SheetTitle data-oid="6w:6qa4">Filters</SheetTitle>
                      <SheetDescription data-oid="j-h3-mb">
                        Filter prompts by category, language, and tags
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6" data-oid="e2rop79">
                      <FilterSection data-oid="z:jx90u" />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block" data-oid="zk5jtsc">
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  data-oid="nnd83zr"
                >
                  {filteredPrompts.length} Prompts
                  {totalPages > 1 && (
                    <span
                      className="text-sm font-normal text-muted-foreground ml-2"
                      data-oid=".8emab-"
                    >
                      (Page {currentPage} of {totalPages})
                    </span>
                  )}
                </h2>
              </div>

              <p className="text-muted-foreground" data-oid="y4uehp6">
                Explore our curated collection of Figma MCP prompts
                {prompts.length !== filteredPrompts.length && (
                  <span className="block text-sm mt-1" data-oid="sao4dq7">
                    Showing {paginatedPrompts.length} of{" "}
                    {filteredPrompts.length} filtered results from{" "}
                    {prompts.length} total prompts
                  </span>
                )}
              </p>

              {/* Search */}
              <div className="mt-4 space-y-3" data-oid="mvsm9cq">
                <div className="relative max-w-md" data-oid="d5e6yvd">
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-oid="3ex5rfl"
                  />

                  <Input
                    placeholder="Search our prompts"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                    data-oid="ghs48-p"
                  />
                </div>

                {/* Selected Filters as Chips */}
                {(selectedCategories.length > 0 ||
                  selectedLanguages.length > 0 ||
                  selectedTags.length > 0) && (
                  <div className="flex flex-wrap gap-2" data-oid="lqkkbxl">
                    {selectedCategories.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.id === categoryId,
                      );
                      return (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className="flex items-center gap-1"
                          data-oid="ue-2xqs"
                        >
                          {category?.icon && (
                            <category.icon
                              className="h-3 w-3"
                              data-oid="w5s20.l"
                            />
                          )}
                          <span data-oid="2-lvyob">{category?.title}</span>
                          <button
                            onClick={() =>
                              handleCategoryToggle(categoryId, false)
                            }
                            className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                            data-oid="m904v0g"
                            aria-label="Remove category filter"
                          >
                            <X className="h-3 w-3" data-oid="5t9ee5d" />
                          </button>
                        </Badge>
                      );
                    })}

                    {selectedLanguages.map((language) => (
                      <Badge
                        key={language}
                        variant="secondary"
                        className="flex items-center gap-1"
                        data-oid="fqbmd26"
                      >
                        <Globe className="h-3 w-3" data-oid="cnvshhd" />
                        <span data-oid="jpwvq2_">{language}</span>
                        <button
                          onClick={() => handleLanguageToggle(language, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          data-oid=":99c0w-"
                          aria-label="Remove language filter"
                        >
                          <X className="h-3 w-3" data-oid="sw80a8n" />
                        </button>
                      </Badge>
                    ))}

                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                        data-oid="_sfuw4d"
                      >
                        <span data-oid="u0cw.0_">{tag}</span>
                        <button
                          onClick={() => handleTagToggle(tag, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          data-oid="7:vwloi"
                          aria-label="Remove tag filter"
                        >
                          <X className="h-3 w-3" data-oid="e_nh5xe" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              data-oid="8-8u.03"
            >
              {paginatedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.slug}
                  prompt={prompt}
                  data-oid="6b323zu"
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8" data-oid="vzv5xdf">
                <Pagination data-oid="ed.y-1:">
                  <PaginationContent data-oid="mr49k3k">
                    <PaginationItem data-oid="q_gcp6s">
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
                        data-oid="cr3fk:0"
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page} data-oid="ou:i:yg">
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                            data-oid="03:13os"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    <PaginationItem data-oid=".dtsllu">
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
                        data-oid="ey.o-yb"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {filteredPrompts.length === 0 && (
              <Card className="p-12 text-center" data-oid="53hefor">
                <div className="text-6xl mb-4 opacity-50" data-oid="uf-fbv2">
                  🔍
                </div>
                <CardTitle className="mb-2" data-oid="3002_jy">
                  No prompts found
                </CardTitle>
                <CardDescription data-oid="cfvgrqm">
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
