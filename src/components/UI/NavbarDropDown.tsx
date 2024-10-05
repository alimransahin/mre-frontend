"use client";

import { logOut } from "@/src/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Link from "next/link";

const NavbarDropDown = () => {
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
          <Link href="/settings" className="w-full block">
            Settings
          </Link>
        </DropdownItem>
        <DropdownItem key="create-post" className="w-full">
          <Link href="/create-post" className="w-full block">
            Create Post
          </Link>
        </DropdownItem>
        <DropdownItem key="logout" className="w-full" onClick={() => logOut()}>
          Logout
          <span className="w-full block"></span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
