import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import React from "react";

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
        <span className="flex gap-4 items-center">
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <X /> : <Menu />}
          </Button>
          <div
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => home.current.scrollIntoView()}
          >
            <Image
              src={avatar}
              alt=""
              className="w-10 object-contain rounded-full"
            />
            <span className="font-bold text-xl text-gray-700">Shivam</span>
          </div>
        </span>
        <ul className="flex gap-2">
          <li>
            <Button
              variant="link"
              onClick={() => home.current.scrollIntoView()}
              className="hidden md:flex text-lg"
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              onClick={() => skills.current.scrollIntoView()}
              className="hidden md:flex text-lg"
            >
              Skills
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              onClick={() => projects.current.scrollIntoView()}
              className="hidden md:flex text-lg"
            >
              Projects
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              onClick={() => contact.current.scrollIntoView()}
              className="hidden md:flex text-lg"
            >
              Contact
            </Button>
          </li>
        </ul>
      </nav>
      <div
        className={`flex flex-col absolute transition-transform duration-300 z-10 w-full top-16 "
      ${openNav ? "-translate-y-0" : "-translate-y-64"}`}
      >
       
          <Button
            variant="ghost"
            onClick={() => {
              home.current.scrollIntoView();
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-transparent/5 "
          >
            Home
          </Button>
        
       
          <Button
            variant="ghost"
            onClick={() => {
              skills.current.scrollIntoView();
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-transparent/5 "
          >
            Skills
          </Button>
        
       
          <Button
            variant="ghost"
            onClick={() => {
              projects.current.scrollIntoView();
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-transparent/5 "
          >
            Projects
          </Button>
        
       
          <Button
            variant="ghost"
            onClick={() => {
              contact.current.scrollIntoView();
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-transparent/5 "
          >
            Contact
          </Button>
        
      </div>
    </>
  );
}

export default Navbar;
