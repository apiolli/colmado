import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const Colmado = () => {
  return <RouterProvider router={appRouter} />;
};
