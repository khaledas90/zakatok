// Mock data for admin dashboard

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "banned";
  createdAt: string;
  lastLogin: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  campaignId: string;
  campaignName: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  likes: number;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  totalCampaigns: number;
  totalDonations: number;
  activeUsers: number;
  region: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  country: string;
  countryCode: string;
  status: "active" | "completed" | "pending" | "cancelled";
  targetAmount: number;
  currentAmount: number;
  donations: number;
  createdAt: string;
  endDate: string;
  organizer: string;
}

// Generate mock users
export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i === 0 ? "admin" : i < 5 ? "moderator" : "user",
  status: i < 3 ? "active" : i < 45 ? "active" : i < 48 ? "inactive" : "banned",
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 1}`,
}));

// Generate mock comments
export const mockComments: Comment[] = Array.from({ length: 200 }, (_, i) => ({
  id: `comment-${i + 1}`,
  userId: `user-${Math.floor(Math.random() * 50) + 1}`,
  userName: `User ${Math.floor(Math.random() * 50) + 1}`,
  userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=comment${i + 1}`,
  content: `This is a comment ${i + 1}. ${i % 3 === 0 ? "Great campaign!" : i % 3 === 1 ? "I support this cause." : "Thank you for your efforts."}`,
  campaignId: `campaign-${Math.floor(Math.random() * 20) + 1}`,
  campaignName: `Campaign ${Math.floor(Math.random() * 20) + 1}`,
  status: i % 10 === 0 ? "pending" : i % 15 === 0 ? "rejected" : "approved",
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  likes: Math.floor(Math.random() * 100),
}));

// Generate mock countries
export const mockCountries: Country[] = [
  { id: "1", name: "Palestine", code: "PS", flag: "🇵🇸", totalCampaigns: 45, totalDonations: 2500000, activeUsers: 1200, region: "Middle East" },
  { id: "2", name: "Syria", code: "SY", flag: "🇸🇾", totalCampaigns: 32, totalDonations: 1800000, activeUsers: 890, region: "Middle East" },
  { id: "3", name: "Yemen", code: "YE", flag: "🇾🇪", totalCampaigns: 28, totalDonations: 1500000, activeUsers: 650, region: "Middle East" },
  { id: "4", name: "Lebanon", code: "LB", flag: "🇱🇧", totalCampaigns: 22, totalDonations: 1200000, activeUsers: 540, region: "Middle East" },
  { id: "5", name: "Jordan", code: "JO", flag: "🇯🇴", totalCampaigns: 18, totalDonations: 950000, activeUsers: 420, region: "Middle East" },
  { id: "6", name: "Egypt", code: "EG", flag: "🇪🇬", totalCampaigns: 15, totalDonations: 800000, activeUsers: 380, region: "Africa" },
  { id: "7", name: "Iraq", code: "IQ", flag: "🇮🇶", totalCampaigns: 12, totalDonations: 650000, activeUsers: 290, region: "Middle East" },
  { id: "8", name: "Sudan", code: "SD", flag: "🇸🇩", totalCampaigns: 10, totalDonations: 450000, activeUsers: 210, region: "Africa" },
];

// Generate mock campaigns
export const mockCampaigns: Campaign[] = Array.from({ length: 30 }, (_, i) => {
  const countries = mockCountries;
  const country = countries[Math.floor(Math.random() * countries.length)];
  const targetAmount = Math.floor(Math.random() * 500000) + 10000;
  const currentAmount = Math.floor(targetAmount * (0.3 + Math.random() * 0.7));
  
  return {
    id: `campaign-${i + 1}`,
    title: `Campaign ${i + 1}: ${["Emergency Relief", "Education Support", "Medical Aid", "Food Distribution", "Shelter Construction"][i % 5]}`,
    description: `This campaign aims to provide essential support for those in need. ${i + 1}`,
    country: country.name,
    countryCode: country.code,
    status: i < 15 ? "active" : i < 25 ? "completed" : i < 28 ? "pending" : "cancelled",
    targetAmount,
    currentAmount,
    donations: Math.floor(Math.random() * 500) + 10,
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    organizer: `Organization ${Math.floor(Math.random() * 10) + 1}`,
  };
});

// Dashboard stats
export const getDashboardStats = () => {
  const activeUsers = mockUsers.filter(u => u.status === "active").length;
  const totalComments = mockComments.length;
  const approvedComments = mockComments.filter(c => c.status === "approved").length;
  const activeCampaigns = mockCampaigns.filter(c => c.status === "active").length;
  const totalDonations = mockCampaigns.reduce((sum, c) => sum + c.currentAmount, 0);
  const topCountry = mockCountries.reduce((top, country) => 
    country.totalDonations > top.totalDonations ? country : top
  );

  return {
    totalUsers: mockUsers.length,
    activeUsers,
    totalComments,
    approvedComments,
    pendingComments: mockComments.filter(c => c.status === "pending").length,
    totalCampaigns: mockCampaigns.length,
    activeCampaigns,
    totalDonations,
    topCountry: topCountry.name,
    totalCountries: mockCountries.length,
  };
};

// Chart data generators
export const getUserGrowthData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map(month => ({
    month,
    users: Math.floor(Math.random() * 20) + 5,
  }));
};

export const getCampaignStatusData = () => {
  return [
    { name: "Active", value: mockCampaigns.filter(c => c.status === "active").length, color: "#10b981" },
    { name: "Completed", value: mockCampaigns.filter(c => c.status === "completed").length, color: "#3b82f6" },
    { name: "Pending", value: mockCampaigns.filter(c => c.status === "pending").length, color: "#f59e0b" },
    { name: "Cancelled", value: mockCampaigns.filter(c => c.status === "cancelled").length, color: "#ef4444" },
  ];
};

export const getDonationTrendData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map(month => ({
    month,
    donations: Math.floor(Math.random() * 50000) + 10000,
  }));
};

export const getCountryDonationsData = () => {
  return mockCountries
    .sort((a, b) => b.totalDonations - a.totalDonations)
    .slice(0, 5)
    .map(country => ({
      name: country.name,
      donations: country.totalDonations,
    }));
};

