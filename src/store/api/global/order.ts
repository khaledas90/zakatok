import { mainApi } from ".";

export interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  qr: string;
  note: string;
  rent: boolean;
  date: string;
  duty_time: string;
  quantity: number;
  country: string;
  deliverDate: string;
  DeliveryDuty: string;
  items: {
    quantity: number;
    productId: number;
    productName: string;
    price: number;
  }[];
}
export const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (newUser) => ({
        url: "orders",
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const { useAddOrderMutation } = api;
