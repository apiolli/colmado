import { Outlet } from "react-router";
import { ColmadoSideBar } from "../components/ColmadoSidebar";
import { CustomHeader } from "../components/CustomHeader";

export const ColmadoLayout = () => {
  return (
    <div className="min-h-screen bg-muted/40">
      <ColmadoSideBar />
      <div className="lg:pl-64">
        <CustomHeader />
        {/* Contenido */}
        <main className="px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
