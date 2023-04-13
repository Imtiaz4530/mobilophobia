import { createStore } from "easy-peasy";

import brandStore from "./brandStore";
import usersStore from "./usersStore";
import productStore from "./productStore";
import wishlistStore from "./wishlistStore";

const store = createStore({
    users: usersStore,
    brands: brandStore,
    products: productStore,
    wishlist: wishlistStore,
  });

export default store