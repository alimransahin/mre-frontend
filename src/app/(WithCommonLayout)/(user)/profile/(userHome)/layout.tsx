export default function layout({
  children,
  userPosts,
}: {
  children: React.ReactNode;
  userPosts: React.ReactNode;
}) {
  return (
    <>
      {children}
      {userPosts}
    </>
  );
}
