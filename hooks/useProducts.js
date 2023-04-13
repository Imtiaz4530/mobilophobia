import { useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"

const useProducts = (brandName) => {
    const [product, setProduct] = useState([])
    const {data, loading, error} = useStoreState((state) => state.products)
    
    useEffect(() => {
        setProduct(data)
    }, [])

    const findProduct = product.filter(item => item.brandName === brandName)

    return {
        findProduct, loading, error
    }
}

export default useProducts