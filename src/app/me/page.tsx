"use client";
import React from "react";
import { LoginDialog } from "../../components/LoginDialog";
import { MessageCard } from "../../components/MessageCard";
import toast from "react-hot-toast";
import { Message } from "../page";

const MyPage = () => {
  const [password, setPassword] = React.useState("");
  const handleDelete = (messageId: string) => {
    if (messageId === "null") {
      return;
    }
    const toastLoading = toast.loading("Please wait...");
    fetch(`/api/delete?messageId=${messageId}&password=${password}`, {
      method: "DELETE",
    })
      .then((parsed) => parsed.json())
      .then((jsonData) => {
        if (jsonData.success) {
          setMessages((messages) =>
            messages.filter((message) => message._id !== messageId)
          );
          toast.success(jsonData.message, { id: toastLoading });
          setPassword("");
        } else {
          toast.error(jsonData.message, { id: toastLoading });
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong", {
          id: toastLoading,
        });
        console.log(err);
      });
  };
  const [isLoggedin, setLoggedin] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    document.getElementsByTagName("html")[0].classList.add("dark");
  }, []);

  return (
    <section className="bg-black/95 scroll-smooth flex flex-col items-center justify-center min-h-screen w-full">
      <p
        className={`lg:text-5xl md:text-4xl text-3xl py-6 ${
          isLoggedin ? "hidden" : ""
        }`}
      >
        Please login to continue
      </p>
      <LoginDialog
        isLoggedin={isLoggedin}
        setLoggedin={setLoggedin}
        setMessages={setMessages}
      />
      <div
        className={`w-full h-full min-h-screen ${isLoggedin ? "" : "hidden"}`}
      >
        <h1
          className={`lg:text-5xl my-6 md:text-4xl text-3xl block text-center ${
            isLoggedin ? "" : "hidden"
          }`}
        >
          All Messages
        </h1>
        <div
          className={`w-full h-fit min-h-96 p-2 mb-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 ${
            isLoggedin ? "" : "hidden"
          }`}
        >
          {messages.length !== 0 ? (
            messages.map((msg, index) => {
              return (
                <MessageCard
                  key={index}
                  name={msg.name}
                  email={msg.email}
                  phone={msg.phone}
                  message={msg.message}
                  _id={msg._id}
                  handleDelete={handleDelete}
                  password={password}
                  setPassword={setPassword}
                />
              );
            })
          ) : (
            <>
              <MessageCard
                name="No Messages"
                email="N/A"
                phone="N/A"
                message="No messages since last update"
                _id="null"
                handleDelete={handleDelete}
                password={password}
                setPassword={setPassword}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyPage;
