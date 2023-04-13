import { createStore } from "easy-peasy";

import brandStore from "./brandStore";
import usersStore from "./usersStore";
import productStore from "./productStore";
import wishlistStore from "./wishlistStore";
import orderStore from "./orderStore";

const store = createStore({
    users: usersStore,
    brands: brandStore,
    products: productStore,
    wishlist: wishlistStore,
    order: orderStore
  });

export default store