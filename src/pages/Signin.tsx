import { H1 } from "@/components/typograph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/constant/validate";
import { cn } from "@/lib/utils";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAccount, { signinUser } from "@/hooks/useAccount";
const Signin = () => {
  const { createSession } = useAccount();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: signinUser) => {
    if (await createSession(data)) {
      toast.success(
        "you're successfully signed in now you can generate the invoices"
      );
      navigate("/");
    }
  };
  return (
    <>
      <div className="container grid h-screen place-items-center">
        <form
          className="m-auto max-w-[500px] w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <H1 className="text-center">SignIn</H1>
          <div className="my-10">
            <Input
              placeholder="Please enter your email"
              type="eamil"
              name="email"
              control={control}
            />
            <p
              className={cn(
                errors.email ? "visible" : "hidden",
                "text-red-500 mt-1"
              )}
            >
              {errors.email?.message || "nothing"}
            </p>
          </div>
          <div>
            <Input
              placeholder="Put strong password to keep you safe..."
              type="password"
              name="password"
              control={control}
            />
            <p
              className={cn(
                errors.password ? "visible" : "hidden",
                "text-red-500 mt-1"
              )}
            >
              {errors.password?.message || "nothing"}
            </p>
          </div>
          <div className="flex justify-center my-10">
            <Button>Let&apos;s goo!!!</Button>
          </div>
          <Button
            variant="link"
            className="float-right"
            type="button"
            onClick={() => navigate("/signup")}
          >
            create your account..
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signin;
