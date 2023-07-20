"use client"

import { urlForImage } from '@/sanity/lib/image'
import {React,useEffect,useState,useContext} from 'react'
import { AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar } from 'react-icons/ai'
import { Product } from '@/app/components'
import { CartContext } from '@/app/contexts/CartContext'

const ProductDetail = ({params}) => {
    const[productData,setProductData] = useState(null)
    const [productsData,setProductsData] = useState(null)
    const [index,setIndex] = useState(0)
    const {addToCart,removeFromCart,cartItems} = useContext
    (CartContext)
    const [amount,setAmount] = useState(0)
    const inc = () => {
        setAmount(pre=>pre+1)
    }
    const dec = () => {
        if(amount>0){
            setAmount(pre=>pre-1)
        }
    }
    const handleAddToCart = () => {
        addToCart(productData,amount)
        setAmount(0)
    }
    useEffect(()=>{
        const getProductData = async (slug) => {
            let res = await fetch(`/api/product/${slug}`,{method:"GET"})
            const {product} = await res.json()
            setProductData(product)
            res = await fetch('/api/products',{method:"GET"})
            const {products} = await res.json()
            setProductsData(products)
        }
        getProductData(params.slug)
    },[])
    return (
            productData && productsData && <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlForImage(productData.image && productData.image[index])} alt={productData.name} 
                        className='product-detail-image'/>
                    </div>
                    <div className='small-images-container'>
                        {productData.image?.map((img,i)=>(
                            <img 
                                src={urlForImage(img)} alt='small-image' 
                                className={i===index?"small-image selected-image":"small-image"}
                                key={`${i}`}
                                onMouseEnter={()=>setIndex(i)}
                            />
                        ))}
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{productData.name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>20</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{productData.details}</p>
                    <p className='price'>${productData.price}</p>
                    <div className='quantity'>
                        <h3>Quantity</h3>
                        <div className='quantity-desc'>
                            <span className='minus'><AiOutlineMinus  onClick={dec}/></span>
                            <span className='num'>{amount}</span>
                            <span className='plus'><AiOutlinePlus  onClick={inc}/></span>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
                        <button className='buy-now'>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {productsData.map(item=>(
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail