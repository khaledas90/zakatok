// "use client";

// import { useState, useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Progress } from "@/components/ui/progress";
// import {
//   DataTable,@/app/[locale]/admin/_components/table/Pagination
//   type Column,
// } from "@/app/[locale]/admin/_components/table/DataTable";
// import { Pagination } from "@/components/admin/Pagination";
// import { mockCampaigns, type Campaign } from "@/lib/mock-data";
// import { MoreVertical, Filter } from "lucide-react";
// import { format } from "date-fns";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function CampaignsPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   const filteredCampaigns = useMemo(() => {
//     return mockCampaigns.filter((campaign) => {
//       const matchesSearch =
//         campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.organizer.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesStatus =
//         statusFilter === "all" || campaign.status === statusFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [searchQuery, statusFilter]);

//   const paginatedCampaigns = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredCampaigns.slice(startIndex, startIndex + pageSize);
//   }, [filteredCampaigns, currentPage, pageSize]);

//   const totalPages = Math.ceil(filteredCampaigns.length / pageSize);

//   const stats = {
//     total: mockCampaigns.length,
//     active: mockCampaigns.filter((c) => c.status === "active").length,
//     completed: mockCampaigns.filter((c) => c.status === "completed").length,
//     pending: mockCampaigns.filter((c) => c.status === "pending").length,
//     totalRaised: mockCampaigns.reduce((sum, c) => sum + c.currentAmount, 0),
//     totalTarget: mockCampaigns.reduce((sum, c) => sum + c.targetAmount, 0),
//   };

//   const getStatusBadge = (status: Campaign["status"]) => {
//     const variants = {
//       active: "bg-green-500/10 text-green-500 border-green-500/20",
//       completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//       pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
//       cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
//     };
//     return (
//       <Badge variant="outline" className={variants[status]}>
//         {status}
//       </Badge>
//     );
//   };

//   const getProgressPercentage = (current: number, target: number) => {
//     return Math.min((current / target) * 100, 100);
//   };

//   // Chart data
//   const statusData = [
//     { name: "Active", value: stats.active, color: "#10b981" },
//     { name: "Completed", value: stats.completed, color: "#3b82f6" },
//     { name: "Pending", value: stats.pending, color: "#f59e0b" },
//     {
//       name: "Cancelled",
//       value: mockCampaigns.filter((c) => c.status === "cancelled").length,
//       color: "#ef4444",
//     },
//   ];

//   const topCampaigns = [...mockCampaigns]
//     .sort((a, b) => b.currentAmount - a.currentAmount)
//     .slice(0, 5)
//     .map((c) => ({
//       name: c.title.substring(0, 20) + "...",
//       amount: c.currentAmount,
//     }));

//   const columns: Column<Campaign>[] = [
//     {
//       key: "title",
//       header: "Campaign",
//       cell: (campaign) => (
//         <div>
//           <div className="font-medium">{campaign.title}</div>
//           <div className="text-sm text-muted-foreground line-clamp-1">
//             {campaign.description}
//           </div>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       key: "country",
//       header: "Country",
//       cell: (campaign) => <Badge variant="outline">{campaign.country}</Badge>,
//       sortable: true,
//     },
//     {
//       key: "organizer",
//       header: "Organizer",
//       cell: (campaign) => (
//         <span className="text-muted-foreground">{campaign.organizer}</span>
//       ),
//       sortable: true,
//     },
//     {
//       key: "progress",
//       header: "Progress",
//       cell: (campaign) => {
//         const progress = getProgressPercentage(
//           campaign.currentAmount,
//           campaign.targetAmount
//         );
//         return (
//           <div className="w-32 space-y-1">
//             <div className="flex justify-between text-xs">
//               <span>${(campaign.currentAmount / 1000).toFixed(0)}K</span>
//               <span>${(campaign.targetAmount / 1000).toFixed(0)}K</span>
//             </div>
//             <Progress value={progress} className="h-2" />
//             <div className="text-xs text-muted-foreground">
//               {progress.toFixed(1)}%
//             </div>
//           </div>
//         );
//       },
//     },
//     {
//       key: "status",
//       header: "Status",
//       cell: (campaign) => getStatusBadge(campaign.status),
//       sortable: true,
//     },
//     {
//       key: "donations",
//       header: "Donations",
//       cell: (campaign) => (
//         <span className="font-medium">{campaign.donations}</span>
//       ),
//       sortable: true,
//     },
//     {
//       key: "endDate",
//       header: "End Date",
//       cell: (campaign) => (
//         <span className="text-muted-foreground">
//           {format(new Date(campaign.endDate), "MMM dd, yyyy")}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       key: "actions",
//       header: "",
//       cell: (campaign) => (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>View Details</DropdownMenuItem>
//             <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
//             {campaign.status === "pending" && (
//               <>
//                 <DropdownMenuItem className="text-green-500">
//                   Approve
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="text-red-500">
//                   Reject
//                 </DropdownMenuItem>
//               </>
//             )}
//             <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ),
//       className: "w-[50px]",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
//         <p className="text-muted-foreground">
//           Manage and monitor all fundraising campaigns
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardDescription>Total Campaigns</CardDescription>
//             <CardTitle className="text-2xl">{stats.total}</CardTitle>
//           </CardHeader>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardDescription>Active Campaigns</CardDescription>
//             <CardTitle className="text-2xl text-green-500">
//               {stats.active}
//             </CardTitle>
//           </CardHeader>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardDescription>Total Raised</CardDescription>
//             <CardTitle className="text-2xl">
//               ${(stats.totalRaised / 1000000).toFixed(2)}M
//             </CardTitle>
//           </CardHeader>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardDescription>Target Amount</CardDescription>
//             <CardTitle className="text-2xl">
//               ${(stats.totalTarget / 1000000).toFixed(2)}M
//             </CardTitle>
//           </CardHeader>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Search campaigns by title, country, or organizer..."
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <Filter className="mr-2 h-4 w-4" />
//                   Status: {statusFilter === "all" ? "All" : statusFilter}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                   All
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("active")}>
//                   Active
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
//                   Completed
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
//                   Pending
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
//                   Cancelled
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <DataTable
//             data={paginatedCampaigns}
//             columns={columns}
//             pageSize={pageSize}
//             emptyMessage="No campaigns found"
//           />
//           {totalPages > 1 && (
//             <div className="mt-4">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={setCurrentPage}
//                 pageSize={pageSize}
//                 totalItems={filteredCampaigns.length}
//               />
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import React from "react";

export default function page() {
  return <div>page</div>;
}
