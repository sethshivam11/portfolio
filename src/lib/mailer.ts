import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const html = (name: string, message: string, email: string, phone?: string) => {
  return `
   <html lang="en">
  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      background-color: #000;
      color: #fff;
      width: 100%;
      height: 100dvh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 50px;
      flex-direction: column;
      gap: 2rem;
    }
    div {
        width: 50%;
    }
    @media screen and (max-width: 1024px){
        div {
            width:80%;
        }
    }
    @media screen and (max-width: 768px){
        div {
            width: 90%;
        }
    }
  </style>
  <body>
    <div>
        Name: ${name}
    </div>
    <div>

        Message: ${message}
    </div>
    <div>
        Email: ${email}
        
    </div>
    <div>
        ${
          phone &&
          `Phone:
            ${phone}`
        }

    </div>
  </body>
</html>

`;
};

const sendEmail = async function (
  name: string,
  message: string,
  email: string,
  phone?: string
) {
  try {
    const updatedHTML = html(name, message, email, phone);
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MY_EMAIL,
      subject: "New message on portfolio",
      text: `You have a new message from ${name} with email ${email} and message ${message}. Please check on https://sethshivam.vercel.app/me`,
      html: updatedHTML,
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
