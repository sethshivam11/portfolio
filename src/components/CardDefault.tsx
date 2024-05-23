import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "./ui/button";

interface CardDefault {
  image: string;
  code: string;
  heading: string;
  details: string;
  visit: string;
}

export const CardDefault: React.FC<CardDefault> = ({
  image,
  code,
  heading,
  details,
  visit,
}) => {
  return (
    <Card className="lg:mt-6 lg:w-1/3 md:w-full md:my-2 sm:my-2 sm:w-full sm:mx-auto w-full mx-auto my-2  font-poppins">
      <CardHeader color="white" className="grid items-center relative h-fit">
        <Image src={image} className="object-fill" alt="" />
      </CardHeader>
      <CardContent>
        <h1 className="mb-2 capitalize font-bold text-xl">{heading}</h1>
        <p>{details}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          className="mr-4 mt-2"
          onClick={() => window.open(visit, "_blank")}
        >
          Visit
        </Button>
        <Button
          className="mt-2"
          variant="outline"
          onClick={() => window.open(code, "_blank")}
        >
          Code
        </Button>
      </CardFooter>
    </Card>
  );
};
