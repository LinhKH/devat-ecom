import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../products/ProductItem';


function ProductDetail() {
    const params = useParams();
    const state = useContext(GlobalState);
    const products = state.productsAPI.products;
    console.log(products);
    const [productDetail, setProductDetail] = useState([]);
    useEffect(() => {
        if (params.id) {
            products && products.forEach(product => {
                if (product._id === params.id) setProductDetail(product);
            })
        }
    }, [params.id, products])
    if (productDetail.length === 0) return null;
    return (
        <>
            <div className="detail">
                <img src={productDetail.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{productDetail.title}</h2>
                        <h6>#id: {productDetail.product_id}</h6>
                    </div>
                    <span>$ {productDetail.price}</span>
                    <p>{productDetail.description}</p>
                    <p>{productDetail.content}</p>
                    <p>Sold: {productDetail.sold}</p>
                    <Link to="/cart" className="cart">
                        Buy Now
                    </Link>
                </div>
            </div>
            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === productDetail.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default ProductDetail
