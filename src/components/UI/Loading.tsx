import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="h-screen bg-default-900/5 fixed inset-0 z-50 backdrop-blur-md flex justify-center items-center ">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
