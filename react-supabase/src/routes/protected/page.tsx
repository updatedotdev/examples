import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { supabaseClient } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import useSWR, { useSWRConfig } from "swr";

async function getUser(): Promise<User | null> {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
  return data.user;
}
export default function ProtectedPage() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();
  const { data: user, error: userError } = useSWR<User | null>("user", getUser);
  const { mutate } = useSWRConfig();

  async function signOut() {
    setIsSigningOut(true);
    await supabaseClient.auth.signOut();
    await mutate("user");
    navigate("/");
  }

  if (userError) {
    return <div>Error fetching user data: {userError.message}</div>;
  }

  if (user == null) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Account</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings
          </p>
        </div>
        <Button onClick={signOut} disabled={isSigningOut}>
          {isSigningOut ? <Spinner /> : "Sign Out"}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium">User Information</h2>
          <div className="grid gap-2 text-sm">
            <div className="grid grid-cols-[120px_1fr]">
              <div className="text-muted-foreground">Email</div>
              <div>{user.email}</div>
            </div>
            <div className="grid grid-cols-[120px_1fr]">
              <div className="text-muted-foreground">User ID</div>
              <div className="font-mono">{user.id}</div>
            </div>
            <div className="grid grid-cols-[120px_1fr]">
              <div className="text-muted-foreground">Last Sign In</div>
              <div>
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : "Never"}
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium">Authentication Status</h2>
          <div className="grid gap-2 text-sm">
            <div className="grid grid-cols-[120px_1fr]">
              <div className="text-muted-foreground">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Authenticated
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr]">
              <div className="text-muted-foreground">Providers</div>
              <div>
                {user.identities
                  ?.map(identity => identity.provider)
                  .join(", ") || "Email"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
