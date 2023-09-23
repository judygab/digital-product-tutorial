// @see https://docs.aircode.io/guide/functions/
import aircode from "aircode";
import { Resend } from "resend";

type Params = {
  email: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_ADDRESS;

export default async function (params: Params) {
  try {
    const data = await resend.emails.send({
      from: fromEmail as string,
      to: params.email,
      subject: "Your Order",
      html: '<div>Thank you for your order! Click <a href="https://webdecoded.notion.site/Dev-Resources-40656a79e51e4dd6ad8988515de19e57?pvs=4">here</a> to access it.</div>',
    });
  } catch (error) {
    console.log("error");
  }
  return {
    message: "delivered",
  };
}
