import connect from "@/lib/dbConfig";
import { MessageModel } from "@/models/message.model";

export async function POST(request: Request) {
  connect();

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
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

    if (
      !(
        username?.trim() === process.env.USER_ID &&
        password?.trim() === process.env.PASSWORD
      )
    ) {
      return Response.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        {
          status: 400,
        }
      );
    }

    const messages = await MessageModel.find();
    return Response.json(
      {
        success: true,
        message: "Messages found",
        msg: messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      message: "Internal Server Error!",
    }, {
        status: 500
    });
  }
}
