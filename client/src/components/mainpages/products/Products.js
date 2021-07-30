import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from './ProductItem';

function Products() {
    const state = useContext(GlobalState)
    const products = state.productsAPI.products;
    console.log(products);

    return (
        <div className="products">
            {
                products && products.map(product => {
                    return <ProductItem product={product} key={product._id}/>
                })
            }
        </div>
    )
}
export default Products