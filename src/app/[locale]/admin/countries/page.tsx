"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Pagination } from "@/components/admin/Pagination";
import { mockCountries, type Country } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Globe, TrendingUp, Users, Megaphone } from "lucide-react";

export default function CountriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return mockCountries;
    return mockCountries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort(
      (a, b) => b.totalDonations - a.totalDonations
    );
  }, [filteredCountries]);

  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedCountries.slice(startIndex, startIndex + pageSize);
  }, [sortedCountries, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedCountries.length / pageSize);

  const totalStats = {
    totalCountries: mockCountries.length,
    totalCampaigns: mockCountries.reduce((sum, c) => sum + c.totalCampaigns, 0),
    totalDonations: mockCountries.reduce((sum, c) => sum + c.totalDonations, 0),
    totalUsers: mockCountries.reduce((sum, c) => sum + c.activeUsers, 0),
  };

  const chartData = mockCountries
    .sort((a, b) => b.totalDonations - a.totalDonations)
    .map((country) => ({
      name: country.name,
      donations: country.totalDonations,
      campaigns: country.totalCampaigns,
      users: country.activeUsers,
    }));

  const columns: Column<Country>[] = [
    {
      key: "name",
      header: "Country",
      cell: (country) => (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{country.flag}</span>
          <div>
            <div className="font-medium">{country.name}</div>
            <div className="text-sm text-muted-foreground">{country.code}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "region",
      header: "Region",
      cell: (country) => <Badge variant="outline">{country.region}</Badge>,
      sortable: true,
    },
    {
      key: "totalCampaigns",
      header: "Campaigns",
      cell: (country) => (
        <span className="font-medium">{country.totalCampaigns}</span>
      ),
      sortable: true,
    },
    {
      key: "totalDonations",
      header: "Donations",
      cell: (country) => (
        <span className="font-medium">
          ${(country.totalDonations / 1000).toFixed(0)}K
        </span>
      ),
      sortable: true,
    },
    {
      key: "activeUsers",
      header: "Active Users",
      cell: (country) => (
        <span className="font-medium">
          {country.activeUsers.toLocaleString()}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
        <p className="text-muted-foreground">
          Overview of campaigns and donations by country
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Total Countries</CardDescription>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.totalCountries}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Total Campaigns</CardDescription>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.totalCampaigns}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Total Donations</CardDescription>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(totalStats.totalDonations / 1000000).toFixed(2)}M
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Active Users</CardDescription>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStats.totalUsers.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Country Details</CardTitle>
          <CardDescription>Detailed breakdown by country</CardDescription>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={paginatedCountries}
            columns={columns}
            pageSize={pageSize}
            emptyMessage="No countries found"
          />
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                totalItems={sortedCountries.length}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
