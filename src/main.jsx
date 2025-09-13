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
// import Notepage from "./components/Notepage.jsx";
import Create from "./components/Create.jsx";
import NoteDetail from "./components/NoteDetail.jsx";
import EditNote from "./components/EditNote.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext";
const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    element: <PrivateRoute />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <Body /> },
          { path: 'notes', element: <Body /> },
          { path: 'about', element: <About /> },
          { path: 'contact', element: <Contact /> },
          { path: 'notes/new', element: <Create /> },
          { path: 'notes/:id', element: <NoteDetail /> },
          { path: 'notes/:id/edit', element: <EditNote /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
