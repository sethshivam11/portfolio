import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-fit w-screen text-gray-200 bg-gray-900 p-10 pb-0 grid">
      <span className="text-5xl font-poppins mb-6 inline-block w-full md:text-center">
        Socials
      </span>
      <ul className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:place-items-center gap-4 w-full">
        <li
          className="p-2 w-28 rounded-md hover:bg-gray-200 hover:text-gray-900 flex gap-2 justify-start cursor-pointer"
          onClick={() => window.open("https://github.com/sethshivam11")}
        >
          <Github /> Github
        </li>
        <li
          className="p-2 w-28 rounded-md hover:bg-gray-200 hover:text-gray-900 flex gap-2 justify-start cursor-pointer"
          onClick={() => window.open("https://linkedin.com/in/sethshivam11")}
        >
          <Linkedin /> Linkedin
        </li>
        <li
          className="p-2 w-28 rounded-md hover:bg-gray-200 hover:text-gray-900 flex gap-2 justify-start cursor-pointer"
          onClick={() => window.open("https://x.com/sethshivam11")}
        >
          <Twitter /> Twitter
        </li>
        <li
          className="p-2 w-28 rounded-md hover:bg-gray-200 hover:text-gray-900 flex gap-2 justify-start cursor-pointer"
          onClick={() => window.open("mailto:legendshivam11@gmail.com")}
        >
          <Mail /> Mail
        </li>
      </ul>
      <hr className="bg-gray-400 w-full h-0.5 border-0 rounded-sm mt-4" />
      <div className="flex items-center justify-center py-4">
        All rights reserved &copy; 2024
      </div>
    </div>
  );
};

export default Footer;
