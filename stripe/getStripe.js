import { loadStripe } from "@stripe/stripe-js";

let stripePromise

const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe("pk_test_51MRzBOBbJsBhwkWMzYsPsK1ccaNY07XAQaY8DcWDMS3ce9oA9sixjDES3v3DLUZ57e7lwT6Wrdbcbygs0kEOGV3V00EXYNR3w6")
    }
    return stripePromise
}

export default getStripe