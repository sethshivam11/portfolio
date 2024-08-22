import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-fit w-full bg-black text-white p-10 pb-0 grid">
      <span className="text-5xl mb-6 text-center">
        Connect with me
      </span>
      <ul className="flex justify-around my-4">
        <Link
          className="flex gap-2 group"
          href="https://github.com/sethshivam11"
        >
          <Github />
          <span className="group-hover:underline">Github</span>
        </Link>
        <Link
          className="flex gap-2 group"
          href="https://linkedin.com/in/sethshivam11"
        >
          <Linkedin />
          <span className="group-hover:underline">Linkedin</span>
        </Link>
        <Link className="flex gap-2 group" href="https://x.com/sethshivam11">
          <Twitter />
          <span className="group-hover:underline">Twitter</span>
        </Link>
        <Link
          className="flex gap-2 group"
          href="mailto:legendshivam11@gmail.com"
        >
          <Mail />
          <span className="group-hover:underline">Mail</span>
        </Link>
      </ul>
      <hr className="bg-gray-400 w-full h-0.5 border-0 rounded-sm mt-4" />
      <div className="flex items-center justify-center py-4">
        All rights reserved &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Footer;
