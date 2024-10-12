import CommentsPage from "@/src/components/UI/post/Comment";
import PostDetails from "@/src/components/UI/post/PostDetails";
import { NextPage } from "next";

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
