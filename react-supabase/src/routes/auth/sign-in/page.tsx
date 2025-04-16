import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/styles";
import { supabaseClient } from "@/utils/supabase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useSWRConfig } from "swr";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { mutate } = useSWRConfig();

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    const email = formData.email;
    const password = formData.password;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("password", { message: error.message });
      setIsLoading(false);
      return;
    }

    await mutate("user");
    navigate("/protected");
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24"
    >
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don&apos;t have an account?{" "}
        <Link className="text-foreground font-medium underline" to="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
          className="mb-3"
          {...register("email")}
          name="email"
          placeholder="you@example.com"
          required
        />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input
          {...register("password")}
          type="password"
          name="password"
          placeholder="Your password"
          required
          className={cn("mb-3", errors.password && "mb-0 border-red-500")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="w-4 h-4 mr-2" />}
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
