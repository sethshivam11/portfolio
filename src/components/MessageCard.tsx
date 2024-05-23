"use client";
import { Button } from "./ui/button";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { CheckboxDemo } from "./CheckboxDemo";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Props {
  email: string;
  phone: string;
  message: string;
  name: string;
  _id: string;
  handleDelete: (id: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export function MessageCard({
  email,
  phone,
  message,
  name,
  _id,
  handleDelete,
  password,
  setPassword,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [showPwd, setShowPwd] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <Card className="w-full bg-transparent ring-1 ring-gray-500 bg-zinc-800 max-w-96">
      <CardContent>
        <h1 className="mb-2 text-2xl text-bold capitalize text-center my-4">
          {name}
        </h1>
        <p className="text-md mt-4 text-gray-300">{message}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-center gap-2 w-full flex-wrap">
          <div className="w-full flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className={phone ? "w-1/2" : "w-full"} asChild>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => (window.location.href = `mailto:${email}`)}
                  >
                    Mail
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{email}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {phone ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-1/2" asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      onClick={() => (window.location.href = `tel:${phone}`)}
                    >
                      Call
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{phone}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              ""
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="lg"
                className="w-full"
                disabled={_id === "null"}
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-gray-200 text-2xl">
                Delete Message
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to delete this message. This action cannot
                be undone. Please enter password to continue
              </DialogDescription>
              <div className="space-y-2 my-3">
                <Label htmlFor="password" className="font-normal">
                  Password
                </Label>
                <Input
                  autoComplete="off"
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  name="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <CheckboxDemo label="Show Password" setChecked={setShowPwd} />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleOpen();
                    setPassword("");
                    setShowPwd(false);
                  }}
                  className="mr-1 text-gray-200 hover:bg-gray-800 disabled:"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleOpen();
                    setPassword("");
                    setShowPwd(false);
                    handleDelete(_id);
                  }}
                  disabled={password.length === 0}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
