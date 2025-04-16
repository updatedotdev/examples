import Content from "@/components/content";
import ProtectedSidebar from "@/components/protected-sidebar";
import { Outlet } from "react-router";

export default function ProtectedLayout() {
  return (
    <Content>
      <div className="flex w-full h-full">
        <ProtectedSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </Content>
  );
}
