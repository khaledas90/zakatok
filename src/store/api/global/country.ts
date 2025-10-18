import { mainApi } from ".";

interface Country {
  id: string;
  name: string;
  nameAr: string;
  nationality: string;
  nationalityAr: string;
}
const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountrys: builder.query<Country[], void>({
      query: () => ({
        url: `lookups/countries`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountrysQuery } = searchApi;
