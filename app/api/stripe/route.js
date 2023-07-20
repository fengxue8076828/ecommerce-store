import Stripe from 'stripe'
import { redirect } from 'next/navigation';
const stripe = new Stripe("sk_test_51MRzBOBbJsBhwkWMLy5nPjlFU8saMFgAz0oPsrGL93TVhCcOfQP2bkTX6q3wtTgl0YDAgtuY3TudJOuoZgrdzlxN00NykAG5r9");


export const POST = async (request) => {

    const data = await request.json()
    try {

      const params = {
        submit_type:"pay",
        mode:"payment",
        payment_method_types:["card"],
        billing_address_collection:"auto",
        shipping_options:[
          {shipping_rate:"shr_1NV8mGBbJsBhwkWMh9H9LeQg"},
          {shipping_rate:"shr_1NV8o3BbJsBhwkWM9oUJqUrQ"},
        ],
        line_items: data.cartItems.map(item=>{
          const img = item.product.image[0].asset._ref;
          const newImage = img.replace("image-",`https://cdn.sanity.io/images/a509gpor/production/`).replace("-webp",".webp")

          return {
            price_data:{
              currency:"usd",
              product_data:{
                name:item.product.name,
                images:[newImage],
              },
              unit_amount:item.product.price * 100
            },
            adjustable_quantity:{
              enabled:true,
              minimum:1,
            },
            quantity:item.amount
          }
        }),
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/?canceled=true`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      return new Response(JSON.stringify(session),{status:200})
    } catch (err) {
      return new Response(err.message,{status:500})
      
    }
}