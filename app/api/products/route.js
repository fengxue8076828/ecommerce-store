import {getProducts} from '../../../sanity/lib/client'
export const GET = async() => {
    const products = await getProducts()
    return new Response(JSON.stringify({products}),{status:200})
}