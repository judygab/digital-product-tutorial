// @see https://docs.aircode.io/guide/functions/
import aircode from "aircode";
import Stripe from "stripe";

type Params = {
  email: string;
  amount: number;
  currency: string;
  paymentMethodType: string;
};

export default async function (params: Params, context: any) {
  console.log("Received params:", params);
  const { email, amount, currency, paymentMethodType } = params;

  if (process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16",
      typescript: true,
    });

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      const payment_id = paymentIntent.id;

      const PaymentsTable = aircode.db.table("payments");
      const paymentItem = {
        user_email: email,
        payment_id,
      };

      const result = await PaymentsTable.save(paymentItem);

      context.status(200);
      return {
        client_secret: paymentIntent.client_secret,
      };
    } catch (e: any) {
      context.status(500);
      console.log(e);
      return {
        message: e.message,
      };
    }
  }

  return {
    message: "Please add stripe api key",
  };
}
