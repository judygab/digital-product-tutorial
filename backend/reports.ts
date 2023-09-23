// @see https://docs.aircode.io/guide/functions/
import aircode from "aircode";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_ADDRESS;

export default async function (params: any, context: any) {
  const paymentsTable = aircode.db.table("payments");
  const to = new Date();
  const from = new Date(to.getTime() - 7 * 60 * 60 * 1000);
  const count = await paymentsTable
    .where({ createdAt: aircode.db.gt(from).lte(to), isConfirmed: true })
    .count();

  const text = "You made" + count + "sales";

  try {
    const data = await resend.emails.send({
      from: fromEmail as string,
      to: fromEmail as string,
      subject: "Weekly Order",
      text,
    });
  } catch (error) {
    console.log("error");
  }
  return {
    message: "delivered",
  };
}
