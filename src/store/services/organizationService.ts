import { mainApi } from "../api";

export interface CreateOrganizationRequest {
  orgnizationName: string;
  licenseNumber: string;
  address: string;
  country: string;
  city: string;
  mobileNumber: string;
  altMobileNumber?: string;
  creationDate: string;
  websiteUrl?: string;
  aboutOgrnization: string;
  paymentBank: Array<{
    bankName: string;
    accountNumber: string;
    iban?: string;
  }>;
  paymentCash?: Array<{
    addresseCash: string;
    cityCash: string;
    mobileCash: string;
    altMobileCash?: string;
    urlMapCash?: string;
  }>;
  DonationsSupported: string[];
  citiesSupported: string[];
  agreeToTerms: boolean;
  totalDonations: number;
  memberCount: number;
  urlpaymentPage?: string;
}

export interface Organization {
  id: string;
  orgnizationName: string;
  licenseNumber: string;
  address: string;
  country: string;
  city: string;
  mobileNumber: string;
  altMobileNumber?: string;
  creationDate: string;
  websiteUrl?: string;
  aboutOgrnization: string;
  paymentBank: Array<{
    bankName: string;
    accountNumber: string;
    iban?: string;
  }>;
  paymentCash?: Array<{
    addresseCash: string;
    cityCash: string;
    mobileCash: string;
    altMobileCash?: string;
    urlMapCash?: string;
  }>;
  DonationsSupported: string[];
  citiesSupported: string[];
  agreeToTerms: boolean;
  totalDonations: number;
  memberCount: number;
  urlpaymentPage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const organizationService = {
  create: async (payload: CreateOrganizationRequest): Promise<Organization> => {
    const { data } = await mainApi.post<Organization>(
      "/api/organizations",
      payload
    );
    return data;
  },

  getAll: async (): Promise<Organization[]> => {
    const { data } = await mainApi.get<Organization[]>("/api/organizations");
    return data;
  },

  getById: async (id: string): Promise<Organization> => {
    const { data } = await mainApi.get<Organization>(
      `/api/organizations/${id}`
    );
    return data;
  },

  update: async (
    id: string,
    payload: Partial<CreateOrganizationRequest>
  ): Promise<Organization> => {
    const { data } = await mainApi.put<Organization>(
      `/api/organizations/${id}`,
      payload
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await mainApi.delete(`/api/organizations/${id}`);
  },
};
