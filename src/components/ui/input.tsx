/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useController } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputProps {
  name: string;
  control: any; // Assuming your control prop is any, you might want to replace it with the actual type
  className?: string;
  type?: string;
  [key: string]: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, control, className, type = "text", ...props }, _ref) => {
    const { field } = useController({
      name,
      control,
    });

    return (
      <div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none",
            className
          )}
          {...field}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
