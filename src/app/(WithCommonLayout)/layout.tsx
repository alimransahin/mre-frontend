import { Navbar } from "@/src/components/UI/navbar/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
