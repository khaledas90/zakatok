"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Pagination } from "@/components/admin/Pagination";
import { mockComments, type Comment } from "@/lib/mock-data";
import { MoreVertical, Filter, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

export default function CommentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredComments = useMemo(() => {
    return mockComments.filter((comment) => {
      const matchesSearch =
        comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.campaignName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || comment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const paginatedComments = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredComments.slice(startIndex, startIndex + pageSize);
  }, [filteredComments, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredComments.length / pageSize);

  const stats = {
    total: mockComments.length,
    approved: mockComments.filter((c) => c.status === "approved").length,
    pending: mockComments.filter((c) => c.status === "pending").length,
    rejected: mockComments.filter((c) => c.status === "rejected").length,
  };

  const getStatusBadge = (status: Comment["status"]) => {
    const variants = {
      approved: {
        className: "bg-green-500/10 text-green-500 border-green-500/20",
        icon: CheckCircle,
      },
      pending: {
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        icon: Clock,
      },
      rejected: {
        className: "bg-red-500/10 text-red-500 border-red-500/20",
        icon: XCircle,
      },
    };
    const variant = variants[status];
    const Icon = variant.icon;
    return (
      <Badge variant="outline" className={variant.className}>
        <Icon className="mr-1 h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const columns: Column<Comment>[] = [
    {
      key: "userName",
      header: "User",
      cell: (comment) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.userAvatar} />
            <AvatarFallback>
              {comment.userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{comment.userName}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "content",
      header: "Comment",
      cell: (comment) => (
        <div className="max-w-md">
          <p className="text-sm line-clamp-2">{comment.content}</p>
        </div>
      ),
    },
    {
      key: "campaignName",
      header: "Campaign",
      cell: (comment) => (
        <span className="text-sm text-muted-foreground">
          {comment.campaignName}
        </span>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (comment) => getStatusBadge(comment.status),
      sortable: true,
    },
    {
      key: "likes",
      header: "Likes",
      cell: (comment) => <span className="text-sm">{comment.likes}</span>,
      sortable: true,
    },
    {
      key: "createdAt",
      header: "Date",
      cell: (comment) => (
        <span className="text-muted-foreground">
          {format(new Date(comment.createdAt), "MMM dd, yyyy")}
        </span>
      ),
      sortable: true,
    },
    {
      key: "actions",
      header: "",
      cell: (comment) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {comment.status === "pending" && (
              <>
                <DropdownMenuItem className="text-green-500">
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Reject
                </DropdownMenuItem>
              </>
            )}
            {comment.status === "approved" && (
              <DropdownMenuItem className="text-red-500">Reject</DropdownMenuItem>
            )}
            {comment.status === "rejected" && (
              <DropdownMenuItem className="text-green-500">Approve</DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: "w-[50px]",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
        <p className="text-muted-foreground">
          Manage and moderate user comments across campaigns
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Comments</CardDescription>
            <CardTitle className="text-2xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-2xl text-green-500">{stats.approved}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Review</CardDescription>
            <CardTitle className="text-2xl text-yellow-500">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rejected</CardDescription>
            <CardTitle className="text-2xl text-red-500">{stats.rejected}</CardTitle>
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
                placeholder="Search comments by content, user, or campaign..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
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
                <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={paginatedComments}
            columns={columns}
            pageSize={pageSize}
            emptyMessage="No comments found"
          />
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                totalItems={filteredComments.length}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
