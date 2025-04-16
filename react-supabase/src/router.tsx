import RootLayout from "@/components/root-layout";
import AuthLayout from "@/routes/auth/layout";
import SignIn from "@/routes/auth/sign-in/page";
import SignUp from "@/routes/auth/sign-up/page";
import Home from "@/routes/home/page";
import ProtectedLayout from "@/routes/protected/layout";
import ProtectedPage from "@/routes/protected/page";
import PaidContentPage from "@/routes/protected/paid-content/page";
import PricingPage from "@/routes/protected/pricing/page";
import SubscriptionPage from "@/routes/protected/subscription/page";
import { supabaseClient } from "@/utils/supabase";
import { createBrowserRouter, redirect } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
        loader: async () => {
          const {
            data: { user },
          } = await supabaseClient.auth.getUser();
          if (user != null) {
            return redirect("/protected");
          }
        },
      },
      {
        path: "/",
        Component: AuthLayout,
        loader: async () => {
          const {
            data: { user },
          } = await supabaseClient.auth.getUser();
          if (user != null) {
            return redirect("/");
          }
          return { user };
        },
        children: [
          { path: "/sign-in", Component: SignIn },
          { path: "/sign-up", Component: SignUp },
        ],
      },
      {
        path: "/protected",
        Component: ProtectedLayout,
        loader: async () => {
          const {
            data: { user },
          } = await supabaseClient.auth.getUser();
          if (user == null) {
            return redirect("/");
          }
          return { user };
        },
        children: [
          {
            path: "/protected",
            Component: ProtectedPage,
          },
          {
            path: "/protected/pricing",
            Component: PricingPage,
          },
          {
            path: "/protected/subscription",
            Component: SubscriptionPage,
          },
          {
            path: "/protected/paid-content",
            Component: PaidContentPage,
          },
        ],
      },
    ],
  },
]);
