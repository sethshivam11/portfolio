"use client";
import React from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ProjectCard } from "../components/ProjectCard";
import Typewriter from "typewriter-effect";
import { Github, Linkedin, Loader2, Mail, Twitter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ThemeProvider } from "@/components/ThemeProvider";
import Icons from "@/components/Icons";
import CustomBadge from "@/components/CustomBadge";
import Link from "next/link";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar
        avatar={avatar}
        home={home}
        skills={skills}
        projects={projects}
        contact={contact}
      />
      <section className="overflow-hidden relative scroll-smooth transition-colors duration-400">
        <div className="bg-gradient-to-br from-sky-300 via-white to-white dark:from-sky-800 dark:via-black dark:to-black">
          <div
            ref={home}
            className="flex flex-col items-start justify-center h-screen min-h-[40rem] py-32 w-full z-10 md:p-10 container"
          >
            <h3 className="text-stone-500 lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-extrabold tracking-tight py-1 lg:pt-12 md:pt-12">
              Hi I&apos;m a
            </h3>
            <h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-bold tracking-tighter pb-2">
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
            </h1>
            <p className="lg:w-2/5 md:w-3/5 sm:w-4/5 w-4/5 mr-2 pt-4 tracking-[-0.01em]">
              I specialize in building efficient, user-friendly applications
              using modern technologies like Next.js, TypeScript, React,
              Node.js, and MongoDB. My work is driven by a passion for creating
              seamless digital experiences through clean, scalable code. I’m
              always eager to explore emerging technologies and continuously
              refine my skills to stay ahead in the ever-evolving tech
              landscape.
            </p>
            <Button
              size="lg"
              className="text-lg mt-10"
              onClick={() => contact.current.scrollIntoView()}
            >
              Connect
            </Button>
          </div>
        </div>
        <div className="sm:container px-3">
          <hr className="bg-stone-500 mb-6" />
          <div className="flex flex-col items-center gap-6">
            <h3
              className="w-full text-center lg:text-4xl text-3xl font-extrabold font-serif"
              ref={skills}
            >
              Skills
            </h3>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 w-full">
              <div className="bg-stone-200 dark:bg-stone-900 rounded-xl p-4 w-full">
                <h3 className="text-center font-bold tracking-tight text-xl">
                  Frameworks & Technologies
                </h3>
                <div className="w-full flex flex-wrap gap-2 py-4 px-2">
                  <CustomBadge>{Icons.html}HTML</CustomBadge>
                  <CustomBadge>{Icons.css}CSS</CustomBadge>
                  <CustomBadge>{Icons.react}React</CustomBadge>
                  <CustomBadge className="dark:hidden">
                    {Icons.expressLight}Express
                  </CustomBadge>
                  <CustomBadge className="hidden dark:flex">
                    {Icons.expressDark}Express
                  </CustomBadge>
                  <CustomBadge>{Icons.tailwind}Tailwind</CustomBadge>
                  <CustomBadge>{Icons.nodejs}Node</CustomBadge>
                  <CustomBadge className="dark:hidden">
                    {Icons.nextLight}Next
                  </CustomBadge>
                  <CustomBadge className="hidden dark:flex">
                    {Icons.nextDark}Next
                  </CustomBadge>
                </div>
              </div>
              <div className="bg-stone-200 dark:bg-stone-900 rounded-xl p-4 w-full">
                <h3 className="text-center font-bold tracking-tight text-xl">
                  Languages & Databases
                </h3>
                <div className="w-full flex flex-wrap gap-2 py-4 px-2">
                  <CustomBadge>{Icons.js}JavaScript</CustomBadge>
                  <CustomBadge>{Icons.typescript}TypeScript</CustomBadge>
                  <CustomBadge>{Icons.mongo}MongoDB</CustomBadge>
                </div>
              </div>
              <div className="bg-stone-200 dark:bg-stone-900 rounded-xl p-4 w-full">
                <h3 className="text-center font-bold tracking-tight text-xl">
                  Tools & Platforms
                </h3>
                <div className="w-full flex flex-wrap gap-2 py-4 px-2">
                  <CustomBadge>{Icons.git}Git</CustomBadge>
                  <CustomBadge className="dark:hidden">
                    {Icons.githubLight}GitHub
                  </CustomBadge>
                  <CustomBadge className="hidden dark:flex">
                    {Icons.githubDark}GitHub
                  </CustomBadge>
                  <CustomBadge className="dark:hidden">
                    {Icons.vercelLight}Vercel
                  </CustomBadge>
                  <CustomBadge className="hidden dark:flex">
                    {Icons.vercelDark}Vercel
                  </CustomBadge>
                  <CustomBadge>{Icons.render}Render</CustomBadge>
                  <CustomBadge>{Icons.redux}Redux</CustomBadge>
                  <CustomBadge>{Icons.zod}Zod</CustomBadge>
                  <CustomBadge>
                    {Icons.reactHookForm}React Hook Form
                  </CustomBadge>
                  <CustomBadge>{Icons.postman}Postman</CustomBadge>
                </div>
              </div>
              <div className="bg-stone-200 dark:bg-stone-900 rounded-xl p-4 w-full">
                <h3 className="text-center font-bold tracking-tight text-xl">
                  Others
                </h3>
                <div className="w-full flex flex-wrap gap-2 py-4 px-2">
                  <CustomBadge>{Icons.figma}Figma</CustomBadge>
                  <CustomBadge>{Icons.jwt}JsonWebToken</CustomBadge>
                  <CustomBadge>{Icons.linux}Linux</CustomBadge>
                </div>
              </div>
            </div>
          </div>
          <hr className="bg-stone-500 my-6" />
          <div ref={projects} className="w-full flex flex-col">
            <h3 className="w-full text-center lg:text-4xl text-3xl font-extrabold font-serif">
              Projects
            </h3>
            <div className="flex justify-center max-lg:flex-col sm:gap-2 gap-6">
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
        </div>
        <div
          ref={contact}
          className="w-full text-center px-6 mt-6 py-8 bg-stone-100 dark:bg-stone-900"
        >
          <div className="flex max-sm:flex-col items-center justify-between h-full w-full sm:container gap-4">
            <div className="space-y-2 lg:w-3/5 md:w-4/5 w-full text-left">
              <h3 className="bg-transparent lg:text-4xl text-3xl font-serif pb-6 font-extrabold max-sm:text-center">
                Connect with me...
              </h3>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  value={message.name}
                  onChange={(e) =>
                    setMessage({ ...message, name: e.target.value })
                  }
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
              <Button
                onClick={saveMessage}
                className="my-4 capitalize max-sm:w-full"
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
            <div className="flex sm:flex-col max-sm:w-full h-full gap-2 items-center justify-evenly">
              <Link
                title="GitHub"
                href="https://github.com/sethshivam11"
                className="ring-1 ring-stone-500 hover:bg-foreground hover:text-background hover:ring-foreground rounded-full p-3"
              >
                <Github />
              </Link>
              <Link
                title="LinkedIn"
                href="https://linkedin.com/in/sethshivam11"
                className="ring-1 ring-stone-500 hover:bg-foreground hover:text-background hover:ring-foreground rounded-full p-3"
              >
                <Linkedin />
              </Link>
              <Link
                title="X"
                href="https://x.com/sethshivam11"
                className="ring-1 ring-stone-500 hover:bg-foreground hover:text-background hover:ring-foreground rounded-full p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28px"
                  height="28px"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07l-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
                  />
                </svg>
              </Link>
              <Link
                title="Mail"
                href="mailto:legendshivam11@gmail.com"
                className="ring-1 ring-stone-500 hover:bg-foreground hover:text-background hover:ring-foreground rounded-full p-3"
              >
                <Mail />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
