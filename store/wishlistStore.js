const { persist, action } = require("easy-peasy");

const wishlistStore = persist({
    data: [],
    loading: false,
    error: '',

    getAllWishlist: action((state, payload) => {
        state.data = payload
    })
})

export default wishlistStore