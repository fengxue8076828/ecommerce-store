"use client"

import {React,createContext,useState} from 'react'

export const CartContext = createContext()
const CartContextProvider = ({children}) => {
    const [cartItems,setCartItems] = useState([])
    const [showCart,setShowCart] = useState(false)
    const [totalAmount,setTotalAmount] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)

    const clearCart = () => {
        setCartItems([])
        setTotalAmount(0)
        setTotalPrice(0)
    }

    const addToCart = (product,amount) => {
        const p = cartItems.find(item=>item.product.slug.current === product.slug.current)
        let newCartItems
        if(p){
            newCartItems = cartItems.map(item=>{
                return item.product.slug.current === product.slug.current?
                        {
                            ...item,
                            amount:item.amount+amount
                        }:item
            })
        }else{
            newCartItems = [...cartItems,{product:product,amount}]
        }
        setCartItems(newCartItems)
        setTotalAmount(pre=>pre+amount)
        setTotalPrice(pre=>pre+product.price*amount)
    }
    const removeFromCart = (product) => {
        const p = cartItems.find(item=>item.product.slug.current === product.slug.current)
        if(p){
            let newCartItems
            if(p.amount>1){
                newCartItems = cartItems.map(item=>{
                    return item.product.slug.current === product.slug.current?
                            {
                                ...item,
                                amount:item.amount-1
                            }:item
                })
            }else{
                newCartItems = cartItems.filter(item=>item.product.slug.current!==p.product.slug.current)
            }
            setCartItems(newCartItems)
            setTotalAmount(pre=>pre-1)
            setTotalPrice(pre=>pre-product.price)
        }     
    }

    const removeItemFromCart = (i) => {
        const newCartItems = cartItems.filter(item=>item.product._id!==i.product._id)
        setCartItems(newCartItems)
        setTotalAmount(pre=>pre-i.amount)
        setTotalPrice(pre=>pre-i.amount*i.product.price)
    }
    return (
        <CartContext.Provider value={{cartItems,showCart,totalAmount,totalPrice,setShowCart,addToCart,removeFromCart,removeItemFromCart,clearCart}}>{children}</CartContext.Provider>
    )
}

export default CartContextProvider