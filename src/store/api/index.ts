import store from "@/store/store";
import { userApi } from "./user";
import { mainApi } from "./global";

const invalidateAllQueries = () => {
  store.dispatch(userApi.util.resetApiState());
  store.dispatch(mainApi.util.resetApiState());
};

export { userApi, mainApi, invalidateAllQueries };
