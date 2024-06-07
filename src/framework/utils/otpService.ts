import nodemailer from "nodemailer";
import IOtpServices from "../../interface/utils/IOtpServices";
import Mailgen from "mailgen";

export default class OtpService implements IOtpServices {
  generateOtp(): string {
    return `${Math.floor(1000 + Math.random() * 9000)}`;
  }

  async sendOtpEmail(
    email: string,
    otp: string,
    userName: string
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASS,
        },
      });

      const MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Meddical",
          link: "https://mailgen.js/",
        },
      });

      const response = {
        body: {
          name: userName,
          intro: "Your OTP for Meddical verification is:",
          table: {
            data: [
              {
                OTP: otp,
              },
            ],
          },
          outro: "Looking forward to doing more business",
        },
      };

      const mail = MailGenerator.generate(response);
      const message = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Meddical OTP Verification",
        html: mail,
      };

      await transporter.sendMail(message);
    } catch (error) {
      console.log("rroejrih", error);
      throw Error();
    }
  }
}
