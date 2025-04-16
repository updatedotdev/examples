import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { ThemeProvider } from "next-themes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <RouterProvider router={router} />
  </ThemeProvider>
);
