"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ListMeta } from "@/types/api";

const DEFAULT_PAGE_SIZES = [5, 10, 15, 20, 25, 30];

interface PaginationProps {
  className?: string;
  page: number;
  setPage: (page: number) => void;
  showPageInfo?: boolean;
  setSize: (size: number) => void;
  meta: ListMeta | undefined;
}

export function Pagination({
  className,
  page,
  setPage,
  showPageInfo,
  setSize,
  meta,
}: PaginationProps) {
  const pageNum = page ?? meta?.number ?? 1;
  const totalPagesNum = meta?.totalPages ?? meta?.totalPages ?? 0;
  const pageSizeNum = meta?.size ?? 10;
  const totalCount = meta?.totalElements || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPagesNum) {
      setPage(newPage);
    }
  };

  const getPageSizes = () => {
    if (!totalPagesNum || totalPagesNum === 0) return DEFAULT_PAGE_SIZES;

    if (totalPagesNum <= 2) {
      return DEFAULT_PAGE_SIZES.filter((val) => val <= 10);
    }

    if (totalPagesNum <= 5) {
      return DEFAULT_PAGE_SIZES.filter((val) => val <= 15);
    }

    return DEFAULT_PAGE_SIZES;
  };

  const filteredPageSizes = getPageSizes();

  if (totalPagesNum <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPagesNum <= maxVisible) {
      for (let i = 1; i <= totalPagesNum; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (pageNum > 3) {
        pages.push("...");
      }

      const start = Math.max(2, pageNum - 1);
      const end = Math.min(totalPagesNum - 1, pageNum + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (pageNum < totalPagesNum - 2) {
        pages.push("...");
      }

      pages.push(totalPagesNum);
    }

    return pages;
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value);
    if (!isNaN(newSize)) {
      setSize(newSize);
      setPage(1);
    } else {
      setSize(10);
      setPage(1);
    }
  };

  const startItem = totalCount ? (pageNum - 1) * pageSizeNum + 1 : undefined;
  const endItem = totalCount
    ? Math.min(pageNum * pageSizeNum, totalCount)
    : undefined;

  return (
    <div
      className={cn(
        "flex items-center justify-between flex-wrap gap-4 border-t pt-4",
        className
      )}
    >
      {showPageInfo && (
        <div className="text-sm text-muted-foreground">
          {totalCount === 0
            ? "No items to display"
            : startItem && endItem
            ? `Showing ${startItem} to ${endItem} of ${totalCount}`
            : `Page ${pageNum} of ${totalPagesNum || 1}`}
        </div>
      )}

      <div className="flex items-center gap-2">
        {pageSizeNum !== 10 && (
          <Select
            value={pageSizeNum.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {filteredPageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={pageNum === 1 || totalCount === 0}
            className="h-9 w-9"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pageNum - 1)}
            disabled={pageNum === 1 || totalCount === 0}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-muted-foreground"
                  >
                    ...
                  </span>
                );
              }

              const pageNumber = page as number;
              return (
                <Button
                  key={pageNumber}
                  variant={pageNum === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className="min-w-[2.5rem] h-9"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pageNum + 1)}
            disabled={pageNum === totalPagesNum || totalCount === 0}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPagesNum)}
            disabled={pageNum === totalPagesNum || totalCount === 0}
            className="h-9 w-9"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
