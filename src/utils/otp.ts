import { transporter } from "../app";
import RSAservice from "../service/Rsa";

export const getCodeOtp = (privateKey: string, publicKey: string) => {
  const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
  const rsaService = new RSAservice({
    privateKey,
    publicKey,
  });
  const hashedOtp = rsaService.encrypt(otp);
  return {
    otp: otp,
    hashedOtp: hashedOtp,
  };
};

export const sendOTPLetter = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  try {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: "vixmatma@gmail.com",
        to: email,
        subject: "Verify Your Letter OTP",
        html: `<p>Enter <b>${otp}</b> in the app to using your letter</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
