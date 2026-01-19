import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./routes/Home";
import Overview from "./routes/Overview";
import Signin from "./routes/auth/Signin";
import Chat from "./routes/Chat";
import Signup from "./routes/auth/Signup";
import Questioning from "./routes/Questioning";
import DocterDashboard from "./routes/DocterDashboard";
import ChatwithDocter from "./routes/ChatwithDocter";
import Dashboard from "./routes/Dashboard";
import WaitingVerification from "./routes/waitingverification";
import Buypremium from "./routes/Buypremium";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/questioning",
    element: <Questioning />,
  },
  {
    path: "/overview",
    element: <Overview />,
  },
  {
    path: "/docter_dashboard",
    element: <DocterDashboard />,
  },
  {
    path: "/chatwithdocter",
    element: <ChatwithDocter />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/waiting-verification",
    element: <WaitingVerification />,
  }
  ,
  {
    path: "/buypremium",
    element: <Buypremium/>,
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
