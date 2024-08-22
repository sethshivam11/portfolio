"use client";
import React from "react";
import { Button } from "./ui/button";
import { Message } from "@/app/page";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckboxDemo } from "./CheckboxDemo";
import { Loader2 } from "lucide-react";

interface resData {
  success: Boolean;
  msg: Message[];
  message: string;
}

interface Props {
  isLoggedin: boolean;
  setLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function LoginDialog({ isLoggedin, setLoggedin, setMessages }: Props) {
  const [creds, setCreds] = React.useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = () => {
    setLoading(true);
    fetch("/api/messages", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((res) => res.json())
      .then((resData: resData) => {
        if (resData.success) {
          setMessages(resData.msg);
          setOpen((cur) => !cur);
          setLoggedin(true);
          setCreds({ username: "", password: "" });
          toast.success("Logged in successfully");
        } else {
          toast.error(resData.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message || "Something went wrong");
      })
      .finally(() => {
        setOpen(false);
        setLoading(false);
      });
  };
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={`m-4 capitalize text-lg ${isLoggedin ? "hidden" : ""}`}
          onClick={() => setOpen(true)}
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto w-full max-w-[24rem]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-xl md:text-2xl text-center">Login</p>
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your username and password to login.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username" className="font-normal">
              Username
            </Label>
            <Input
              autoComplete="off"
              id="username"
              type="text"
              value={creds.username}
              name="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCreds({ ...creds, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="font-normal">
              Password
            </Label>
            <Input
              id="Password"
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              value={creds.password}
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCreds({ ...creds, [e.target.name]: e.target.value })
              }
            />
          </div>
          <CheckboxDemo label="Show Password" setChecked={setShowPassword} />
        </div>
        <DialogFooter>
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={creds.username.length < 1 || creds.password.length < 1 || loading}
          >
            {loading ? <Loader2 className="animate-spin" />: "Login"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
