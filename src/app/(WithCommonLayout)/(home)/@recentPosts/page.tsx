import { getAllPost } from "@/src/services/RecentPost";
import Container from "@/src/components/UI/Container";
import PostCard from "@/src/components/UI/Card";

const RecentPost = async () => {
  const { data: posts } = await getAllPost();
  return (
    <Container>
      <div className="max-w-2xl mx-auto  p-4 grid justify-center gap-2 sm:grid-cols-1 ">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default RecentPost;
