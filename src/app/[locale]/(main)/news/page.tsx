"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GlobalTable,
  type TableRowData,
} from "@/app/[locale]/admin/_components/table/GlobalTable";
import { mockNews, type News } from "@/lib/mock-news";
import { Plus, Edit, Trash2, Eye, Filter } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { BasePageInputs } from "@/types/common";
import type { ListMeta } from "@/types/api";

interface NewsPageInputs extends BasePageInputs {
  search?: string;
  status?: string | null;
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [newsList, setNewsList] = useState(mockNews);

  const basePageInputs = useForm<NewsPageInputs>({
    defaultValues: {
      page: 1,
      size: 10,
      search: "",
      status: null,
      sort: "createdAt,desc",
    },
  });

  const { watch, setValue } = basePageInputs;
  const currentPage = watch("page") || 1;
  const pageSize = watch("size") || 10;

  const filteredNews = useMemo(() => {
    return newsList.filter((news) => {
      const matchesSearch =
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || news.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [newsList, searchQuery, statusFilter]);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredNews.slice(startIndex, startIndex + pageSize);
  }, [filteredNews, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredNews.length / pageSize);

  const meta: ListMeta = useMemo(
    () => ({
      totalElements: filteredNews.length,
      totalPages: totalPages,
      size: pageSize,
      number: currentPage,
    }),
    [filteredNews.length, totalPages, pageSize, currentPage]
  );

  const stats = {
    total: newsList.length,
    published: newsList.filter((n) => n.status === "published").length,
    draft: newsList.filter((n) => n.status === "draft").length,
    archived: newsList.filter((n) => n.status === "archived").length,
  };

  const getStatusBadge = (status: News["status"]) => {
    const variants = {
      published: "bg-green-500/10 text-green-500 border-green-500/20",
      draft: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      archived: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  const handleAdd = () => {
    setSelectedNews(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (news: News) => {
    setSelectedNews(news);
    setIsDialogOpen(true);
  };

  const handleDelete = (news: News) => {
    setSelectedNews(news);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = (formData: Partial<News>) => {
    if (selectedNews) {
      // Update existing news
      setNewsList(
        newsList.map((n) =>
          n.id === selectedNews.id
            ? { ...n, ...formData, updatedAt: new Date().toISOString() }
            : n
        )
      );
    } else {
      // Add new news
      const newNews: News = {
        id: `news-${Date.now()}`,
        title: formData.title || "",
        content: formData.content || "",
        author: "Current User",
        authorEmail: "user@example.com",
        category: formData.category || "General",
        status: (formData.status as News["status"]) || "draft",
        views: 0,
        likes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: formData.tags || [],
      };
      setNewsList([newNews, ...newsList]);
    }
    setIsDialogOpen(false);
    setSelectedNews(null);
  };

  const confirmDelete = () => {
    if (selectedNews) {
      setNewsList(newsList.filter((n) => n.id !== selectedNews.id));
      setIsDeleteDialogOpen(false);
      setSelectedNews(null);
    }
  };

  const headerCells: Omit<TableRowData, "id"> = {
    title: "Title",
    author: "Author",
    category: "Category",
    status: "Status",
    views: "Views",
    likes: "Likes",
    createdAt: "Created",
    actions: "",
  };

  const rows: TableRowData[] = useMemo(
    () =>
      paginatedNews.map((news) => ({
        id: news.id,
        title: (
          <div>
            <div className="font-medium">{news.title}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {news.content}
            </div>
          </div>
        ),
        author: (
          <div>
            <div className="font-medium">{news.author}</div>
            <div className="text-xs text-muted-foreground">
              {news.authorEmail}
            </div>
          </div>
        ),
        category: <Badge variant="outline">{news.category}</Badge>,
        status: getStatusBadge(news.status),
        views: <span className="font-medium">{news.views}</span>,
        likes: <span className="font-medium">{news.likes}</span>,
        createdAt: (
          <span className="text-muted-foreground">
            {format(new Date(news.createdAt), "MMM dd, yyyy")}
          </span>
        ),
        actions: (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="View">
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(news)}
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(news)}
              title="Delete"
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      })),
    [paginatedNews]
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              News Management
            </h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your news articles
            </p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add News
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total News</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Published</CardDescription>
              <CardTitle className="text-2xl text-green-500">
                {stats.published}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Drafts</CardDescription>
              <CardTitle className="text-2xl text-yellow-500">
                {stats.draft}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Archived</CardDescription>
              <CardTitle className="text-2xl text-gray-500">
                {stats.archived}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search news by title, content, or author..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setValue("page", 1);
                  }}
                  className="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("published")}
                  >
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("archived")}>
                    Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <GlobalTable
              headerCells={headerCells}
              rows={rows}
              meta={meta}
              basePageInputs={
                basePageInputs as unknown as UseFormReturn<
                  NewsPageInputs,
                  unknown,
                  undefined
                >
              }
              page={currentPage}
              setPage={(page) => setValue("page", page)}
              setSize={(size) => {
                setValue("size", size);
                setValue("page", 1);
              }}
              emptyMessage="No news articles found"
            />
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <NewsDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedNews(null);
        }}
        onSave={handleSave}
        news={selectedNews}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              news article "{selectedNews?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// News Dialog Component
function NewsDialog({
  isOpen,
  onClose,
  onSave,
  news,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<News>) => void;
  news: News | null;
}) {
  const [formData, setFormData] = useState({
    title: news?.title || "",
    content: news?.content || "",
    category: news?.category || "General",
    status: news?.status || "draft",
    tags: news?.tags.join(", ") || "",
  });

  React.useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        content: news.content,
        category: news.category,
        status: news.status,
        tags: news.tags.join(", "),
      });
    } else {
      setFormData({
        title: "",
        content: "",
        category: "General",
        status: "draft",
        tags: "",
      });
    }
  }, [news, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{news ? "Edit News" : "Add New News"}</DialogTitle>
          <DialogDescription>
            {news
              ? "Update the news article information below."
              : "Fill in the details to create a new news article."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <textarea
              id="content"
              className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="General">General</option>
                <option value="Emergency">Emergency</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Food">Food</option>
                <option value="Shelter">Shelter</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as News["status"],
                  })
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="urgent, help, support"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
