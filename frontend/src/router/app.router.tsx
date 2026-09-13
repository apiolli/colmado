import { createBrowserRouter, Navigate } from "react-router";
import { ColmadoLayout } from "@/shared/layouts/ColmadoLayout";
import { DasboardPage } from "@/features/dashboard/pages/DasboardPage";
import { Products } from "@/features/products/pages/Products";
import { CategoriesPage } from "@/features/categories/pages/CategoriesPage";
import { NewSalePage } from "@/features/new-sale/pages/NewSalePage";
import { SalesHistoryPage } from "@/features/sales-history/pages/SalesHistoryPage";
import { InventoryPage } from "@/features/inventory/pages/InventoryPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { AuthLayout } from "@/features/auth/layout/AuthLayout";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";

export const appRouter = createBrowserRouter([
  // Rutas principales
  {
    path: "/",
    element: <ColmadoLayout />,
    children: [
      {
        index: true,
        element: <DasboardPage />,
      },
      {
        path: "products/",
        element: <Products />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "new-sale",
        element: <NewSalePage />,
      },
      {
        path: "sales-history",
        element: <SalesHistoryPage />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },

  // Rutas auth
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
