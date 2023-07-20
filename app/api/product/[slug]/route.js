import {getProduct} from '../../../../sanity/lib/client'

export const GET = async (req,{params}) => {
    const slug = params.slug
    const product = await getProduct(slug)
    return new Response(JSON.stringify({product}),{status:200})

}