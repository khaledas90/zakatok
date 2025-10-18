import { mainApi } from ".";

interface City {
  id: string;
  name: string;
  nameAr: string;
}
const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCitys: builder.query<City[], { countryId: number }>({
      query: ({ countryId }) => ({
        url: `lookups/cities?countryId=${countryId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCitysQuery } = searchApi;
