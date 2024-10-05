import { Button } from "@nextui-org/button";
import Link from "next/link";
import { getRecentPost } from "@/src/services/RecentPost";
import Container from "@/src/components/UI/Container";
import Card from "@/src/components/UI/Card";

const RecentPost = async () => {
  const { data: cars } = await getRecentPost();

  return (
    <Container>
      <div className="section-title" my-8>
        <h2 className="mb-2 text-center text-2xl">Recently found items</h2>
        <p className="text-center"> A list of item </p>
      </div>
      <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-3">
        {cars.map((car: any) => (
          <Card key={car._id} post={car} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-default-900 text-default" size="md">
          <Link href="/found-all">See ALl</Link>
        </Button>
      </div>
    </Container>
  );
};

export default RecentPost;
