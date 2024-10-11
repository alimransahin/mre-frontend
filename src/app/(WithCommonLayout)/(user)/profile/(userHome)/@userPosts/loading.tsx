import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquareMore,
  Forward,
  Download,
} from "lucide-react";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default async function RecentPosts() {
  const skeletonCards = Array(3).fill(0); // Create an array of 3 elements

  return (
    <div className="flex flex-col items-center space-y-6">
      {skeletonCards.map((_, index) => (
        <Card key={index} className="max-w-2xl shadow-lg p-4 bg-default-100">
          <div>
            <CardHeader className="p-0 flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
            </CardHeader>

            <CardBody className="p-0 mt-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="w-full h-40" />
            </CardBody>

            {/* Footer Stats */}
            <CardBody className="p-4 flex flex-row justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </CardBody>

            {/* Footer Buttons */}
            <CardFooter className="border-t border-gray-200 p-2 flex justify-around">
              <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200">
                <ArrowBigUp className="mx-auto" /> Upvote
              </span>
              <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200">
                <ArrowBigDown className="mx-auto" /> Downvote
              </span>
              <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200">
                <MessageSquareMore className="mx-auto" /> Comment
              </span>
              <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200">
                <Forward className="mx-auto" /> Share
              </span>
              <span className="text-center p-1 cursor-pointer rounded-md hover:bg-default-200">
                <Download className="mx-auto" /> Save
              </span>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
