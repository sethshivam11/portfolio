import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProjectCard {
  image: string;
  code: string;
  heading: string;
  details: string;
  visit: string;
}

export const ProjectCard = ({
  image,
  code,
  heading,
  details,
  visit,
}: ProjectCard) => {
  return (
    <Card className="lg:mt-6 lg:w-1/3 md:w-full md:my-2 sm:my-2 sm:w-full w-full my-2 font-poppins">
      <CardHeader
        color="white"
        className="grid items-center relative lg:h-64 sm:h-72 h-52 m-4"
      >
        <Image
          src={image}
          className="object-contain"
          objectFit="contain"
          layout="fill"
          alt=""
        />
      </CardHeader>
      <CardContent>
        <h1 className="mb-2 capitalize font-bold text-xl">{heading}</h1>
        <p>{details}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={visit} target="_blank">
          <Button className="mr-4 mt-2">Visit</Button>
        </Link>
        <Link href={code} target="_blank">
          <Button
            className="mt-2"
            variant="outline"
          >
            Code
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
