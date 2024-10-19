"use client";
import Link from "next/link";

import NavbarDropDown from "./NavbarDropDown";

import { useUser } from "@/src/context/UserProvider";

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
