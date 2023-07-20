"use client"

import {React,useContext} from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import Link from 'next/link'
import { CartContext } from '../contexts/CartContext'
import Cart from './Cart'

const Navbar = () => {
  const {totalAmount,showCart,setShowCart} = useContext(CartContext)
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">
          ELETRONIC-STORE
        </Link>
      </p>
      <button type="button" className='cart-icon' onClick={()=>setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalAmount}</span>
      </button>
      {showCart && <Cart />}
    </div>  
    
  )
}

export default Navbar