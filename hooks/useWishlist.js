import { useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"

const useWishlist = (id) => {
    const [product, setProduct] = useState([])
    const {data, loading, error} = useStoreState((state) => state.wishlist)
    const {data: productsData} = useStoreState((state) => state.products)

    const combineObject = data.reduce((acc, cur) => {
        const userId = cur.userid;

        if (!acc[userId]) {
            acc[userId] = [];
        }
        acc[userId].push(Number(cur.productId));
        return acc;
    }, {});

    const allIds = Number(Object.keys(combineObject).filter((item) => Number(item) === id))
    const singleId = combineObject[allIds]

    useEffect(() => {
        if (singleId !== undefined) {
            const productsSearch = productsData.filter((item) => singleId.includes(item.id))
            setProduct(productsSearch)
        }
    }, [id])

    return {
        product, loading, error
    }
}

export default useWishlist
