// @see https://docs.aircode.io/guide/functions/
import aircode from "aircode";
import sendOrderEmail from "./send-order-email";

export default async function (params: any, context: any) {
  console.log("Received params:", params);

  const paymentId = params.data.object.id;
  const eventType = params.type;
  let paymentConfirmed;

  if (eventType === "payment_intent.succeeded") {
    paymentConfirmed = true;
  } else if (eventType === "payment_intent.payment_failed") {
    paymentConfirmed = false;
  } else {
    return {
      message: "Received unknown event type",
    };
  }

  const PaymentsTable = aircode.db.table("payments");
  const firstRecord = await PaymentsTable.where({
    payment_id: paymentId,
  }).findOne();

  if (!firstRecord) {
    return {
      message: "Payment not found",
    };
  }

  firstRecord.isConfirmed = paymentConfirmed;

  await PaymentsTable.save(firstRecord);

  await sendOrderEmail({ email: firstRecord.user_email });

  return {
    message: "Payment confirmed successfully",
  };
}
