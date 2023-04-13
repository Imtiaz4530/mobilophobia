import { useStoreState } from "easy-peasy"

const useUCProducts = () => {
    const {data} = useStoreState(state => state.products)

    const upComingProducts = data.filter((item) => item.upcoming)

    return upComingProducts
}

export default useUCProducts