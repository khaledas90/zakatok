"use client";

import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import type { BasePageInputs } from "@/types/common";
import type { ListMeta } from "@/types/api";
import { Pagination } from "./Pagination";

export interface TableRowData {
  id: string;
  [key: string]: ReactNode | undefined;
}

interface TableProps<TInputs extends BasePageInputs> {
  headerCells: Record<string, ReactNode>;
  rows: TableRowData[];
  meta?: ListMeta;
  basePageInputs: UseFormReturn<TInputs, unknown, undefined>;
  setSize: (size: number) => void;
  page: number;
  setPage: (page: number) => void;
  className?: string;
  error?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export const GlobalTable = <T extends BasePageInputs>($: TableProps<T>) => {
  const headerKeys = Object.keys($.headerCells);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col overflow-hidden relative",
        $.className
      )}
    >
      <div className="table_container m-auto w-full overflow-x-auto -mx-2 px-2">
        <div className="min-w-full inline-block">
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  {headerKeys.map((cellKey, i) => (
                    <TableHead
                      key={$.headerCells[cellKey]?.toString() || "cell" + i}
                      className="bg-[#F4F6F8] whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2">
                        {$.headerCells[cellKey]}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              {!$.isLoading && (
                <TableBody>
                  {$.rows.map((row, i) => (
                    <TableRow
                      key={row.id?.toString() || "" + i}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      {headerKeys.map((headerCell) => (
                        <TableCell
                          key={headerCell}
                          className="p-4 whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span>{row[headerCell]}</span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>

          <div className="md:hidden space-y-4">
            {!$.isLoading &&
              $.rows.map((row, i) => (
                <div
                  key={row.id?.toString() || "" + i}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {headerKeys.map((headerCell, index) => (
                    <div
                      key={headerCell}
                      className={cn(
                        "flex justify-between items-center py-2",
                        index !== headerKeys.length - 1 &&
                          "border-b border-gray-100"
                      )}
                    >
                      <span className="font-medium text-gray-600 text-sm">
                        {$.headerCells[headerCell]}
                      </span>
                      <span className="text-gray-900 text-sm text-right max-w-[60%]">
                        {row[headerCell]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        {!$.isLoading && $.rows.length === 0 && (
          <div className="flex flex-col gap-4 flex-1 min-h-[350px] items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">
                {$.emptyMessage || "No data found"}
              </p>
            </div>
            {$.error && (
              <div className="text-center text-destructive">
                <p className="text-sm font-medium">{$.error}</p>
              </div>
            )}
          </div>
        )}

        {$.isLoading && (
          <div className="flex w-full min-h-[350px] py-5 flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        )}
      </div>

      {$.meta && (
        <Pagination
          page={$.page}
          setPage={$.setPage}
          setSize={$.setSize}
          meta={$.meta}
        />
      )}
    </div>
  );
};
