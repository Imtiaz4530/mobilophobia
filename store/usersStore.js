const { persist, action } = require("easy-peasy");

const usersStore = persist({
    data: [],
    loading: false,
    error: '',

    getAllProducts: action((state, payload) => {
        state.data.push(payload)
    })
})

export default usersStore