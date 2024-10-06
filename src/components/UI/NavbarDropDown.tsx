"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/UserProvider";
import { logOut } from "@/src/services/AuthService";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

const NavbarDropDown = () => {
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
        <Avatar
          className="cursor-pointer"
          showFallback
          src="https://images.unsplash.com/broken"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" className="w-full">
          <Link href="/profile" className="w-full block">
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem key="settings" className="w-full">
          <Link href="/profile/settings" className="w-full block">
            Settings
          </Link>
        </DropdownItem>
        <DropdownItem key="create-post" className="w-full">
          <Link href="/profile/create-post" className="w-full block">
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
