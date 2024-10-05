import { ReactNode } from "react";

export default function layout({
  children,
  recentPosts,
}: {
  children: React.ReactNode;
  recentPosts: React.ReactNode;
}) {
  return (
    <>
      {children}
      {recentPosts}
    </>
  );
}
