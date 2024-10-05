import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
  isDeleted?: boolean;
  isBlock?: boolean;
  isVerified?: boolean;
};
