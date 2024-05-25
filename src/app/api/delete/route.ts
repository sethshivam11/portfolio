import connect from "@/lib/dbConfig";
import { MessageModel } from "@/models/message.model";

export async function DELETE(request: Request) {
  connect();

  try {
    const messageId = request.url.split("messageId=")[1].split("&")[0];
    const password = request.url.split("password=")[1].split("&")[0];

    if (!messageId || !password) {
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
      !(typeof password === "string") ||
      password.trim() !== process.env.PASSWORD
    ) {
      console.log(password, process.env.PASSWORD);
      return Response.json(
        {
          success: false,
          message: "Invalid password",
        },
        {
          status: 400,
        }
      );
    }

    const message = await MessageModel.findByIdAndDelete(messageId);
    if (!message) {
      return Response.json(
        {
          success: false,
          message: "Message not found",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      {
        status: 400,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
