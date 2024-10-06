import { Button } from "@nextui-org/button";
import {
  Card as NextUICard,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import React from "react";

const Card = ({ post }: { post: any }) => {
  return (
    <NextUICard isFooterBlurred className="h-[300px] w-full">
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <p className="absolute top-0 right-1 rounded-full bg-black px-2 text-tiny uppercase">
          {post.name}
        </p>
        <h4 className="mt-2 rounded bg-black/30 p-1 text-2xl font-medium  text-white ">
          {post.name}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="card bg"
        className="scale-x-125 z-0 h-full w-full -translate-y-6 object-cover "
        src="https://i.ibb.co.com/Yjp4Kcr/about.jpg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-400">
        <div>
          <p className="text-tiny text-black">{post.pricePerHour}</p>
          <p className="text-tiny text-black">{post.color}</p>
        </div>
        <Button
          className=" bg-black text-tiny text-white"
          radius="full"
          size="sm"
        >
          Details
        </Button>
      </CardFooter>
    </NextUICard>
  );
};

export default Card;
