import {getBanners} from '../../../sanity/lib/client'

export const GET = async () => {
    const banners = await getBanners()
    return new Response(JSON.stringify({banners}),{status:200})
}