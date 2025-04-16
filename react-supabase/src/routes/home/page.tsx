import ViteLogo from "@/components/vite-logo";
import { Button } from "@/components/ui/button";
import UpdateLogo from "@/components/update-logo";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-xl flex flex-col">
        <div className="flex gap-8 justify-start w-full items-center">
          <a
            href="https://update.dev/?utm_source=create-update-app&utm_medium=template&utm_term=vite"
            target="_blank"
            rel="noreferrer"
          >
            <UpdateLogo className="w-[128px]" />
          </a>
          <span className="border-l rotate-45 h-6" />
          <a
            href="https://vitejs.dev/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <ViteLogo className="w-6 h-6" />
            <span className="text-[28px]">Vite</span>
          </a>
        </div>
        <p className="text-3xl lg:text-4xl !leading-tight mt-4">
          Get started with Vite and Update
        </p>
        <p className="text-muted-foreground mt-4">
          To see your account, plans, and more, sign in or sign up to gain
          access to the protected page. Make sure to set your .env file before
          signing in.
        </p>
        <div className="flex gap-[8px] mt-4">
          <Button asChild className="mt-4 w-fit">
            <Link to="/sign-in">Sign in</Link>
          </Button>
          <Button variant="outline" asChild className="mt-4 w-fit">
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </div>
        <div className="h-[1px] w-full bg-border my-12" />
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Join Our Community</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get help, share your work, and connect with other developers.
            </p>
            <Button variant="secondary" asChild size="sm">
              <a
                href="https://discord.gg/Guege5tXFK"
                target="_blank"
                rel="noreferrer"
              >
                Join Discord
              </a>
            </Button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Read the Docs</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Learn how to build amazing apps with our documentation.
            </p>
            <Button variant="secondary" asChild size="sm">
              <a
                href="https://update.dev/docs"
                target="_blank"
                rel="noreferrer"
              >
                View Documentation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
