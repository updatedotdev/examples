import { Button } from "@/components/ui/button";
import ExternalAuthButton from "@/components/external-auth-button";
import { Link } from "react-router";
import { updateClient } from "@/utils/update";
import useSWR from "swr";

async function getUser() {
  const { data } = await updateClient.auth.getUser();
  if (data.user == null) {
    throw new Error("User not found");
  }
  return data.user;
}

export default function Header() {
  const { data, isLoading } = useSWR("user", getUser);

  return (
    <nav className="border-b w-full h-16 shrink-0 flex items-center">
      <div className="px-6 w-full flex items-center justify-between mx-auto">
        <Link to="/" className="text-sm font-medium">
          Next.js + Update Starter Template
        </Link>
        <div className="flex items-center gap-2">
          {!isLoading && data == null && (
            <>
              <Button variant="outline" asChild>
                <Link to="/sign-in">Custom Sign In</Link>
              </Button>
              <ExternalAuthButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
