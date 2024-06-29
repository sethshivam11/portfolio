"use client";
import React from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ProjectCard } from "../components/ProjectCard";
import Typewriter from "typewriter-effect";
import Footer from "../components/Footer";
import icons from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Repo {
  homepage: string;
  name: string;
  description: string;
  html_url: string;
  image: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Home() {
  const [avatar, setAvatar] = React.useState<string>("");
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({
    name: "",
    phone: "",
    message: "",
    email: "",
  });

  const saveMessage = async () => {
    setLoading(true);
    await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.message === "Message saved successfully") {
          setLoading(false);
          setMessage({ name: "", message: "", phone: "", email: "" });
          toast.success("Message sent successfully");
        } else {
          setLoading(false);
          toast.error("Some error occured");
        }
      })
      .catch((err) => {
        console.log(`Some Error Occured \n${err}`);
        setLoading(false);
        toast.error("Some error occured");
      });
  };
  const home = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const skills = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const projects = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const contact = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    const images = [
      "gadgetstore!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1716479485/gadget-store/hk5fbe0osyhfnigas0it.png",
      "chatapp!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456419/gadget-store/coz0elqxhrucgsfefwf8.png",
      "cloudnotebook!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456418/gadget-store/zxbhft8dxwdwwcyiikf4.png",
      "moviesandtv!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1706461801/gadget-store/wtjjddmuatsxzvpbyjps.png",
      "2048!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456420/gadget-store/kfhxvzhotnfbukmb69hy.png",
      "copypaste!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456418/gadget-store/flolutsgg2ei8goxnslg.png",
      "grosery!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456425/gadget-store/ed7l6bcujfqy1cnaapt1.png",
      "myonline!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456424/gadget-store/lfbl4cvuvf92xtyz2vk0.png",
      "newsapp!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/dl8ytjgggiuwcnejk0ym.png",
      "robospeaker!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456912/gadget-store/vgchgwjhexbnut7duthn.png",
      "scholarship!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/kh0cum8cfkb4hwa6dg7l.png",
      "sda!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456889/gadget-store/tmafjkxcttnzqjnpdi93.png",
      "sudoku!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/sl8tmc385fkothhl8g0x.png",
      "weather!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1705748723/gadget-store/e2glyvsyxj5ad1t8m0w4.png",
      "gpt-clone!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1707051362/gadget-store/fgkfhdy057qwcg3bpuar.png",
      "todo!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1707051363/gadget-store/omkupcly4hprbbtbivql.png",
      "campus-space!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1716479483/gadget-store/xj2ylslxkzz99acd1xbs.png",
      "social-media-backend!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1716652387/gadget-store/g84hiq73cygxp71gh42k.jpg",
    ];

    const getRepos = (url: string) => {
      fetch(`${url}/repos`)
        .then((res) => res.json())
        .then((data) => {
          let mapData: Repo[] = [];
          data.forEach((repository: Repo) => {
            if (
              repository.name === "campus-space" ||
              repository.name === "gadgetstore" ||
              repository.name === "social-media-backend"
            ) {
              mapData.push(repository);
              let name: string = repository.name;
              images.forEach((link) => {
                if (link.includes(name)) {
                  repository.image = link.split("!")[1];
                }
              });
            }
          });
          setRepos(mapData);
          setAvatar(data[0].owner.avatar_url);
        })
        .catch((err) => console.log(err));
    };
    getRepos("https://api.github.com/users/sethshivam11");
  }, []);

  return (
    <section className="overflow-hidden relative scroll-smooth dark:bg-black/95 dark:text-gray-200 transition-colors duration-400">
      <div className="ellipse-blue" />
      <div className="ellipse-red" />
      <Navbar
        avatar={avatar}
        home={home}
        skills={skills}
        projects={projects}
        contact={contact}
      />
      <div
        ref={home}
        className="flex flex-col items-start justify-center h-screen min-h-[40rem] py-32 w-screen border-solid border-b-2 border-gray-300 z-10 lg:p-20 p-6"
      >
        <p className="inline-block text-[cadetblue] lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-normal font-inika py-1 lg:pt-12 md:pt-12">
          Hi I&apos;m a
        </p>
        <div className="inline-block text-slate-950 lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-normal font-istok pb-2">
          <Typewriter
            options={{
              strings: [
                "Web Developer",
                "MERN Developer",
                "Frontend Developer",
                "Backend Developer",
              ],
              autoStart: true,
              loop: true,
              delay: 100,
              deleteSpeed: 100,
            }}
          />
        </div>
        <p className="lg:text-xl md:text-lg md:text-md sm:text-md text-justify text-slate-700 lg:w-2/5 md:w-3/5 sm:w-4/5 w-4/5 mr-2 font-poppins pt-4">
          Shivam Soni, a passionate developer. Currently, pursuing
          Bachelor&apos;s in Computer Science from ARSD College, DU. Looking for
          Internships to gain some industry practices and upgrade my skills
          accordingly.
        </p>
        <Button
          variant="ghost"
          size="lg"
          className="rounded-lg text-gray-800 ml-8 mt-10 ring-1 ring-gray-400 font-normal text-lg"
          onClick={() => contact.current.scrollIntoView()}
        >
          Connect
        </Button>
      </div>
      <div ref={skills} className="h-fit w-screen z-10 pt-10 p-6">
        <p className="text-black lg:text-4xl lg:pl-10 md:pl-6 text-3xl font-normal font-serif">
          Major Skills
        </p>
        <div className="grid md:grid-cols-6 grid-cols-3 place-content-center mt-10 lg:mx-10 mx-4 font-poppins">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="basis-24 lg:basis-44 md:basis-36">
                  <div className="h-52 relative">
                    <Image
                      className="object-contain"
                      src="react.svg"
                      alt=""
                  width="300"
                  height="600"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>ReactJS</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="basis-24 lg:basis-44 md:basis-36">
                <div className="h-52 relative">
                  <Image
                    className="object-contain"
                    src="js.svg"
                    alt=""
                  width="300"
                  height="600"
                  />
                </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>JavaScript</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="basis-24 lg:basis-44 md:basis-36">
                <div className="h-52 relative">

                  <Image
                    className="object-contain"
                    src="express.svg"
                    alt=""
                  width="300"
                  height="600"
                  />
                </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>ExpressJS</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="basis-24 lg:basis-44 md:basis-36">
                <div className="h-52 relative">

                  <Image
                    className="object-contain"
                    src="node.svg"
                    alt=""
                  width="300"
                  height="600"
                  />
                </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>NodeJS</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="basis-24 lg:basis-44 md:basis-36">
                <div className="h-52 relative">

                  <Image
                    className="object-contain"
                    src="github.svg"
                    alt=""
                  width="300"
                  height="600"
                  />
                </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Git & Github</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="basis-24 lg:basis-44 md:basis-36">
                <div className="h-52 relative">

                  <Image
                    className="object-contain"
                    src="mongo.svg"
                    alt=""
                  width="300"
                  height="600"
                  />
                </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>MongoDB</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <p className="w-full pb-6 ml-6 text-black lg:text-4xl lg:pl-10 md:pl-6 text-3xl font-normal font-serif">
        All Skills
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 place-content-center border-solid border-b-2 border-gray-300 md:px-20 sm:px-12 px-8 pb-4">
        <li>
          <p className="text-black text-2xl font-poppins py-4">Frontend</p>
          <div className="flex flex-row flex-wrap gap-4">
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.html}
              {/* <span className="text-lg font-normal">HTML</span> */}
              HTML
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.css}
              CSS
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.js}
              JavaScript
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.tailwind}
              TailwindCSS
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.react}
              ReactJS
            </Badge>
          </div>
        </li>

        <li>
          <p className="pt-4 text-black text-2xl font-poppins py-4">Backend</p>
          <div className="flex flex-row flex-wrap gap-4">
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.nodejs}
              NodeJS
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.express}
              ExpressJS
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.typescript}
              TypeScript
            </Badge>
          </div>
        </li>

        <li>
          <p className="pt-4 text-black text-2xl font-poppins py-4">Database</p>
          <div className="flex flex-row flex-wrap gap-4">
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              <div className="relative h-10 w-10">{icons.mongo}</div>
              MongoDB
            </Badge>
          </div>
        </li>

        <li>
          <p className="pt-4 text-black text-2xl font-poppins py-4">Others</p>
          <div className="flex flex-row flex-wrap gap-4">
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.git}
              Git
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              {icons.github}
              GitHub
            </Badge>
            <Badge variant="outline" className="flex gap-2 font-normal text-lg">
              <div className="relative h-10 w-10">{icons.linux}</div>
              Linux
            </Badge>
          </div>
        </li>
      </ul>
      <div ref={projects} className="p-6 w-screen">
        <p className="mt-10 pb-8 text-black lg:text-4xl lg:pl-10 md:pl-6 text-3xl font-serif">
          Projects
        </p>
        <div className="flex justify-center w-fit sm:flex-col sm:gap-2 flex-col md:flex-col md:gap-2 lg:flex-row gap-6 font-poppins">
          {repos.map((repo) => {
            return (
              <ProjectCard
                key={repo.name}
                image={repo.image}
                heading={repo.name}
                details={repo.description}
                visit={repo.homepage}
                code={repo.html_url}
              />
            );
          })}
        </div>
      </div>
      <div
        ref={contact}
        className="w-full h-fit lg:px-20 md:px-10 px-6 mt-8 py-8 border-t-2 border-solid border-gray-200 font-poppins bg-gray-200"
      >
        <p className="bg-transparent lg:text-4xl text-3xl font-serif pb-6 pl-4">
          Connect with me...
        </p>
        <div className="space-y-2 lg:w-2/5 pl-4 w-full">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              id="name"
              value={message.name}
              onChange={(e) => setMessage({ ...message, name: e.target.value })}
              placeholder="name"
              title="Name"
              inputMode="text"
              autoComplete="given-name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              name="phone"
              placeholder="phone"
              id="phone"
              value={message.phone}
              type="number"
              onChange={(e) =>
                setMessage({ ...message, phone: e.target.value })
              }
              title="Phone"
              inputMode="numeric"
              autoComplete="tel"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="email"
              id="email"
              value={message.email}
              onChange={(e) =>
                setMessage({ ...message, email: e.target.value })
              }
              title="Email"
              inputMode="email"
              autoComplete="email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="message">Message</Label>
            <Textarea
              placeholder="message"
              id="message"
              name="message"
              value={message.message}
              onChange={(e) =>
                setMessage({ ...message, message: e.target.value })
              }
              title="Message"
            />
          </div>
        </div>
        <Button
          onClick={saveMessage}
          className="my-4 ml-4 capitalize font-normal"
          size="lg"
          disabled={
            message.name.trim().length === 0 ||
            message.message.trim().length === 0 ||
            message.email.trim().length === 0 ||
            loading
          }
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </div>
      <Footer />
    </section>
  );
}
