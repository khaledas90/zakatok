import { Product } from "@/actions/product";
import { mainApi } from ".";
import { QueryResponse } from "@/types/api";

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
    searchInputProducts: builder.query<void, { search: string }>({
      query: ({ search }) => ({
        url: "/search",
        method: "GET",
        params: { search },
      }),
      providesTags: ["SearchResults"],
    }),
    searchPopular: builder.query<
      QueryResponse<Product[]>,
      { search: string; page: number }
    >({
      query: ({ search, page }) => ({
        url: `/products/search/${search}?page=${page}&size=20`,
        method: "GET",
      }),
    }),
    getProductByCategoryId: builder.query<
      QueryResponse<Product[]>,
      {
        categoryId?: number;
        page: number;
        size: number;
        search: string;
        sort: string;
      }
    >({
      query: ({ categoryId, page, size, search, sort }) => ({
        url: `products`,
        method: "GET",
        params: filterParams({
          categoryId: categoryId ?? 0,
          page,
          size,
          search,
          sort,
          active: true,
        }),
      }),
    }),
    getProductBySlug: builder.query<
      Product,
      {
        slug: string;
      }
    >({
      query: ({ slug }) => ({
        url: `products/slug/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSearchInputProductsQuery,
  useSearchPopularQuery,
  useGetProductByCategoryIdQuery,
  useGetProductBySlugQuery,
} = searchApi;
