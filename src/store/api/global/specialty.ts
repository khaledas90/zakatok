import { mainApi } from ".";

interface Specialty {
  id: string;
  name: string;
  nameAr: string;
}
const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecialty: builder.query<Specialty[], void>({
      query: () => ({
        url: `lookups/specialities`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSpecialtyQuery } = searchApi;
