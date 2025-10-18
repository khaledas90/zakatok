import { Product } from "@/actions/product";
import { mainApi } from ".";
import { QueryResponse } from "@/types/api";

export interface Doctor {
  id: number;
  name: string;
  nameAr: string;
  photo: string;
  yearsOfExperience: number;
  fees: string;
  telephone: string;
  email: string;
  whatsapp: string;
  rating: number;
  gander: string;
  slug: string;
  about: string;
  nationality: {
    id: number;
    name: string;
    nameAr: string;
    nationality: string;
    nationalityAr: string;
  };
  education: string[];
  certificates: string[];
  languages: {
    id: number;
    name: string;
  }[];
  specialities: {
    id: number;
    name: string;
    nameAr: string;
  }[];
  branches: {
    id: number;
    address: string;
    addressAr: string;
    phone: string;
    email: string;
    mapLocation: string;
  }[];
}

const filterParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== 0 &&
        value !== "all" &&
        !(typeof value === "number" && isNaN(value))
    )
  );
};

const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<
      QueryResponse<Doctor[]>,
      {
        page?: number;
        size?: number;
        cityId?: number;
        hospitalId?: number;
        certificate?: string;
        languageId?: number;
        specialityId?: number;
        gender?: string;
        numberOfOperations?: number;
        name?: string;
        yearsOfExperience?: number;
        sort?: string;
      }
    >({
      query: ({
        page,
        size,
        cityId,
        hospitalId,
        certificate,
        languageId,
        gender,
        numberOfOperations,
        specialityId,
        name,
        yearsOfExperience,
        sort,
      }) => ({
        url: "/doctors",
        method: "GET",
        params: filterParams({
          page,
          size,
          cityId,
          hospitalId,
          certificate,
          languageId,
          specialityId,
          gender,
          numberOfOperations,
          name,
          yearsOfExperience,
          sort,
        }),
      }),
      providesTags: ["Doctors"],
    }),
  }),
});

export const { useGetDoctorsQuery } = searchApi;
