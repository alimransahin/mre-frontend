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
        <NavbarDropDown />
      ) : (
        <>
          <Link href="/login">Login </Link>
          <Link href="/signup">Signup </Link>
        </>
      )}
    </>
  );
};

export default UserProfile;
