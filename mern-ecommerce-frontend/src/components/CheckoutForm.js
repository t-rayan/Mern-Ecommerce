import { Button } from "@chakra-ui/react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = () => {
  return (
    // <form onSubmit={handlePayment}>
    //   {stripe && <PaymentElement />}
    //   <Button shadow="lg" mt={5} colorScheme="green" disabled={!stripe}>
    //     Confirm Payment
    //   </Button>
    // </form>
    <div>hello world</div>
  );
};

export default CheckoutForm;
