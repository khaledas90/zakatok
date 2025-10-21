import { mainApi } from ".";

interface PaymentCash {
  addresseCash: string;
  cityCash: string;
  mobileCash: string;
  altMobileCash?: string;
  urlMapCash?: string;
}

interface PaymentBank {
  bankName: string;
  accountNumber: string;
  iban?: string;
}

interface Orgnization {
  id: string;
  orgnizationName: string;
  licenseNumber: string;
  address: string;
  country: string;
  city: string;
  mobileNumber: string;
  altMobileNumber: string;
  creationDate: string;
  totalDonations: number;
  memberCount: number;
  websiteUrl: string;
  aboutOgrnization: string;
  urlpaymentPage: string;
  paymentBank: PaymentBank[];
  paymentCash: PaymentCash[];
  DonationsSupported: string[];
  citiesSupported: string[];
  agreeToTerms: boolean;
}

interface CreateOrgnizationRequest extends Omit<Orgnization, "id"> {
  id?: string;
}

const OrgnizationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrgnizations: builder.query<Orgnization[], void>({
      query: () => ({
        url: `organizations`,
        method: "GET",
      }),
    }),
    addOrgnization: builder.mutation<Orgnization, CreateOrgnizationRequest>({
      query: (orgnization) => ({
        url: `organizations`,
        method: "POST",
        body: orgnization,
      }),
    }),
  }),
});

export const { useGetOrgnizationsQuery, useAddOrgnizationMutation } =
  OrgnizationApi;
