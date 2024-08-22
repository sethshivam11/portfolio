import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import React from "react";
import { Dancing_Script } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ModeToggle from "./ModeToggle";

const dancing = Dancing_Script({ subsets: ["latin"] });

interface Props {
  home: React.MutableRefObject<HTMLDivElement>;
  skills: React.MutableRefObject<HTMLDivElement>;
  projects: React.MutableRefObject<HTMLDivElement>;
  contact: React.MutableRefObject<HTMLDivElement>;
  avatar: string;
}

function Navbar({ home, skills, projects, contact, avatar }: Props) {
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <>
      <nav className="flex flex-row justify-between items-center px-4 h-16 z-20 bg-transparent/5 backdrop-blur-sm fixed w-full">
        <div className="flex gap-4 justify-between items-center w-full">
          <div
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => home.current.scrollIntoView()}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={avatar} />
              <AvatarFallback
                className={`bg-stone-900 text-white ${dancing.className}`}
              >
                SS
              </AvatarFallback>
            </Avatar>
            <span className={`font-extrabold text-2xl ${dancing.className}`}>
              Shivam
            </span>
          </div>
          <div className="space-x-2 md:hidden">
            <ModeToggle />
            <Button
              size="icon"
              variant="default"
              className="bg-transparent hover:bg-transparent/5 text-zinc-800"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        <div className="md:flex hidden gap-2 text-lg">
          <Button className="bg-transparent hover:bg-transparent hover:underline text-black dark:text-white" onClick={() => home.current.scrollIntoView()}>Home</Button>
          <Button className="bg-transparent hover:bg-transparent hover:underline text-black dark:text-white" onClick={() => skills.current.scrollIntoView()}>
            Skills
          </Button>
          <Button className="bg-transparent hover:bg-transparent hover:underline text-black dark:text-white" onClick={() => projects.current.scrollIntoView()}>
            Projects
          </Button>
          <Button className="bg-transparent hover:bg-transparent hover:underline text-black dark:text-white" onClick={() => contact.current.scrollIntoView()}>
            Contact
          </Button>
          <ModeToggle />
        </div>
      </nav>
      <nav
        className={`flex flex-col fixed transition-transform backdrop-blur-sm duration-300 z-10 w-full top-16 "
      ${openNav ? "-translate-y-0" : "-translate-y-64"}`}
      >
        <Button
          variant="ghost"
          onClick={() => {
            home.current.scrollIntoView();
            setOpenNav(!openNav);
          }}
          className="md:hidden w-full rounded-none py-5 bg-transparent/5 hover:bg-transparent/10"
        >
          Home
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            skills.current.scrollIntoView();
            setOpenNav(!openNav);
          }}
          className="md:hidden w-full rounded-none py-5 bg-transparent/5 hover:bg-transparent/10"
        >
          Skills
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            projects.current.scrollIntoView();
            setOpenNav(!openNav);
          }}
          className="md:hidden w-full rounded-none py-5 bg-transparent/5 hover:bg-transparent/10"
        >
          Projects
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            contact.current.scrollIntoView();
            setOpenNav(!openNav);
          }}
          className="md:hidden w-full rounded-none py-5 bg-transparent/5 hover:bg-transparent/10"
        >
          Contact
        </Button>
      </nav>
    </>
  );
}

export default Navbar;
