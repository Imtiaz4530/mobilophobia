import { useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"

const useFindproduct = (id) => {
    const [product, setProduct] = useState([])
    const {data, loading, error} = useStoreState((state) => state.products)
    
    useEffect(() => {
        setProduct(data)
    }, [])

    const findProduct = product.filter(item => item.id === Number(id))

    const items = findProduct.reduce((acc, cur) => {
        if (cur) {
            acc.id = cur.id
            acc.price = cur.price
            acc.discount = cur.discount
            acc.imgURL = cur.imageurl
            acc.alt = cur.imagehash
        }

        return acc
    }, {})

    return {
        findProduct, items, loading, error
    }
}

export default useFindproduct