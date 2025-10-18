import { mainApi } from ".";

interface languages {
  id: string;
  name: string;
}
const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getlanguages: builder.query<languages[], void>({
      query: () => ({
        url: `lookups/languages`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetlanguagesQuery } = searchApi;
