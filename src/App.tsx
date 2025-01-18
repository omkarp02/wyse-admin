import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignIn from "./app/auth/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFound from "./app/PageNotFound";
import routes from "./routes";

function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: routes,
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
