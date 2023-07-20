import { createClient } from 'next-sanity'

export const client = createClient({
  apiVersion:"2023-07-15",
  dataset:"ecommerce-dataset",
  projectId:"a509gpor",
  useCdn:true,
})

export const getProducts = async() => {
    const productsQuery = '*[_type ==  "product"]'
    const products = await client.fetch(productsQuery)
    return products
}
export const getProduct = async(slug) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`
  const product = await client.fetch(query)
  return product
}

export const getBanners = async () => {
  const bannerQuery = '*[_type == "banner"]'
  const banners = await client.fetch(bannerQuery)
  return banners
}
