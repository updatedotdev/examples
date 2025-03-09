import Link from "next/link";
import { Button } from "@/components/ui/button";
import ExternalAuthButton from "@/components/external-auth-button";
import { createClient } from "@/utils/update/server";

export default async function Header() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <nav className="border-b w-full h-16 shrink-0 flex items-center">
      <div className="px-6 w-full flex items-center justify-between mx-auto">
        <Link href="/" className="text-sm font-medium">
          Next.js + Update Starter Template
        </Link>
        <div className="flex items-center gap-2">
          {user == null && (
            <>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Custom Sign In</Link>
              </Button>
              <ExternalAuthButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
