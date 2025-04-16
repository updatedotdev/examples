import Header from "@/components/header";
import { Suspense } from "react";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <Outlet />
    </>
  );
}
