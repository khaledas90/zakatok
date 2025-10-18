import { axiosBaseQuery } from "@/utils/axiosConfig";
import { createApi } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "main-api",
  tagTypes: ["Order", "SearchResults", "Category", "Doctors"],
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  endpoints: () => ({}),
});
