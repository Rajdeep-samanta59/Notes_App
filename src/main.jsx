import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Body /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
