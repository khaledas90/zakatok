"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { mainApi } from "../axiosConfig";

export interface OrganizationData {
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
  paymentBank: any;
  paymentCash?: any[];
  DonationsSupported: string[];
  citiesSupported: string[];
  agreeToTerms: boolean;
  totalDonations: number;
  memberCount: number;
  urlpaymentPage: string;
}

const addOrganization = async (data: OrganizationData) => {
  const response = await mainApi.post("/organizations", data);
  return response.data;
};

export const useAddOrgnizationMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    },
  });
};

