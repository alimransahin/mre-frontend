"use client";

import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useEffect } from "react";

import { useGetCurrentUser } from "@/src/hooks/auth.hook";
import { logOut } from "@/src/services/AuthService";
import { useUser } from "@/src/context/UserProvider";

const NavbarDropDown = () => {
  const { user } = useUser();
  const { mutate: handleGetUser, data } = useGetCurrentUser();

  useEffect(() => {
    if (user?.email) {
      handleGetUser({ email: user.email });
    }
  }, [user?.email, handleGetUser]);
  const currentUser = data?.data;
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logOut();
    userLoading(true);
    // Navigate to the /logout path, which will trigger the middleware
    router.push("/logout");
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        {currentUser?.profilePicture ? (
          <Avatar
            showFallback
            className="cursor-pointer"
            src={currentUser?.profilePicture}
          />
        ) : (
          <Avatar
            showFallback
            className="cursor-pointer"
            src="https://images.unsplash.com/broken"
          />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" className="w-full">
          <Link className="w-full block" href="/profile">
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem key="settings" className="w-full">
          <Link className="w-full block" href="/profile/settings">
            Settings
          </Link>
        </DropdownItem>
        <DropdownItem key="create-post" className="w-full">
          <Link className="w-full block" href="/profile/create-post">
            Create Post
          </Link>
        </DropdownItem>

        {/* Other dropdown items */}
        <DropdownItem key="logout" className="w-full" onClick={handleLogout}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
