import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Dancing_Script } from "next/font/google";

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
            <div className="w-10 h-10 relative">
              <Image
                src={avatar}
                alt=""
                layout="fill"
                className="object-contain rounded-full"
              />
            </div>
            <span className={`font-extrabold text-2xl ${dancing.className}`}>
              Shivam
            </span>
          </div>
          <Button
            size="icon"
            variant="default"
            className="md:hidden bg-transparent hover:bg-transparent/5 text-zinc-800"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <X /> : <Menu />}
          </Button>
        </div>
        <ul className="md:flex hidden gap-2">
          <li>
            <Button
              variant="link"
              onClick={() => home.current.scrollIntoView()}
              className="text-lg"
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              onClick={() => skills.current.scrollIntoView()}
              className="text-lg"
            >
              Skills
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              onClick={() => projects.current.scrollIntoView()}
              className="text-lg"
            >
              Projects
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              onClick={() => contact.current.scrollIntoView()}
              className="text-lg"
            >
              Contact
            </Button>
          </li>
        </ul>
      </nav>
      <div
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
      </div>
    </>
  );
}

export default Navbar;
