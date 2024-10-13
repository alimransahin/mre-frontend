import { NextPage } from "next";

import CommentsPage from "@/src/components/UI/post/Comment";
import PostDetails from "@/src/components/UI/post/PostDetails";

interface Params {
  postId: string;
}
interface DynamicPostPageProps {
  params: Params;
}

const DynamicPostPage: NextPage<DynamicPostPageProps> = ({ params }) => {
  return (
    <>
      <PostDetails postId={params.postId} />
      <CommentsPage postId={params.postId} />;
    </>
  );
};

export default DynamicPostPage;
