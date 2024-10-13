"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
}

export default function MraInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // Use watch to get the current value, including defaultValues
  const value = watch(name); // This will provide the default value if set

  return (
    <Input
      {...register(name)}
      defaultValue={value || ""} // Set the default value here
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
