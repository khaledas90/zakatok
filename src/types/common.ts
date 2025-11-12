export interface BasePageInputs {
  page: number;
  size: number;
  search?: string;
  isActive?: boolean | null;
  sort: string;
  isService?: boolean | null;
}

export type UserRole = "superAdmin" | "admin" | "trainer" | "staff" | "member";

export type SubscriptionTier =
  | "basic"
  | "professional"
  | "business"
  | "enterprise";
