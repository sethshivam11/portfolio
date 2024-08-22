import connect from "@/lib/dbConfig";
import sendEmail from "@/lib/mailer";
import { MessageModel } from "@/models/message.model";

export async function POST(request: Request) {
  connect();
  try {
    const { name, email, message, phone } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const msg = await MessageModel.create({
      name,
      email,
      message,
      phone,
    });

    await sendEmail(name, message, email, phone);

    return Response.json({
      success: true,
      message: "Message saved successfully",
      msg,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
