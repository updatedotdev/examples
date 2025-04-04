import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateClient } from "@/utils/update";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useSWRConfig } from "swr";

type FormData = {
  email: string;
  password: string;
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, setError, handleSubmit } = useForm<FormData>();
  const { mutate } = useSWRConfig();

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    const email = formData.email;
    const password = formData.password;

    const { error } = await updateClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setError("email", { message: error.message });
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
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text-foreground">
        Already have an account?{" "}
        <Link className="text-foreground font-medium underline" to="/sign-in">
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
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
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="w-4 h-4 mr-2" />}
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
