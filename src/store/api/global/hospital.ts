import { QueryResponse } from "@/types/api";
import { mainApi } from ".";

interface Hospital {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
}
const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospital: builder.query<Hospital[], void>({
      query: () => ({
        url: `lookups/hospitals`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHospitalQuery } = searchApi;
