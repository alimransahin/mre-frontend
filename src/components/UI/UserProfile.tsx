"use client";
import { useUser } from "@/src/context/UserProvider";
import { NavbarItem } from "@nextui-org/navbar";
import NavbarDropDown from "./NavbarDropDown";
import Link from "next/link";

const UserProfile = () => {
  const { user } = useUser();
  return (
    <>
      {user?.email ? (
        <NavbarItem className="hidden sm:flex gap-2">
          <NavbarDropDown />
        </NavbarItem>
      ) : (
        <NavbarItem className="hidden sm:flex gap-2">
          <Link href="/login"></Link>
        </NavbarItem>
      )}
    </>
  );
};

export default UserProfile;
