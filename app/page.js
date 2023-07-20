"use client"

import {React,useState,useContext} from 'react'
import { Fragment, useEffect } from 'react'
import {Product,FooterBanner,HeroBanner} from './components'


const Home = () => {
  const [productsData,setProductsData] = useState([])
  const [bannersData,setBannersData] = useState([])
  

  useEffect(()=>{
    const getBannersData = async () => {
      const res = await fetch("api/banners",{method:"GET"})
      const {banners} = await res.json()
      setBannersData(banners)
    }
    const getProductsData = async () => {
      const res = await fetch(`api/products`,{method:"GET"})
      const {products} = await res.json()
      setProductsData(products)
    }
    getBannersData() 
    getProductsData()
  },[])
  
  return (
    <Fragment>
      {bannersData.length && <HeroBanner banner={bannersData[0]}/>}
      <div className='products-heading'>
        <h2>Beset selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {
          productsData?.map(product=><Product key={product._id} product={product} />)
        }
      </div>
      {bannersData.length && <FooterBanner banner={bannersData[0]}/>}
    </Fragment>
  )
}

export default Home