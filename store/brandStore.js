const { persist, action } = require("easy-peasy");

const brandStore = persist({
    data: [],
    loading: false,
    error: '',

    getAllBrands: action((state, payload) => {
        state.data = payload
    })
})

export default brandStore