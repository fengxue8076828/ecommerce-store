"use client"

import React,{useRef,useContext} from 'react'
import Link from 'next/link'
import {AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import { Toast } from 'react-hot-toast'
import { CartContext } from '../contexts/CartContext'
import { urlForImage } from '@/sanity/lib/image'
import getStripe from '../../stripe/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const {setShowCart,cartItems,totalAmount,totalPrice,addToCart,removeFromCart,removeItemFromCart} = useContext(CartContext)

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const res = await fetch("/api/stripe",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({cartItems})
    })

    if(res.statusCode === 500) return 
    
    const data = await res.json()
    stripe.redirectToCheckout({sessionId:data.id})
  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={()=>setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalAmount} items)</span>
        </button>
        {
          cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <button
                type='button'
                className='btn'
                onClick={()=>setShowCart(false)}
              >
                Continue shopping
              </button>
            </div>
          )
        }
        <div className='product-container'>
          {
            cartItems.length>0 && cartItems.map((item,index)=>(
              <div className='product' key={item.product._id}>
                <img src={urlForImage(item.product.image[0])} className='cart-product-image' alt={item.product.name} />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.product.name}</h5>
                    <h4>{item.product.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <div className='quantity-desc'>
                        <span className='minus'><AiOutlineMinus  onClick={()=>removeFromCart(item.product)}/></span>
                        <span className='num'>{item.amount}</span>
                        <span className='plus'><AiOutlinePlus  onClick={()=>addToCart(item.product,1)}/></span>
                      </div>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={()=>removeItemFromCart(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>                 
                </div>               
              </div>
            ))
          }
          {cartItems.length > 0 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Total:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button className='btn' type='button' onClick={handleCheckout}>
                  Check out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart