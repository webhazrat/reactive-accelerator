import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/Root";
import Error from "./Error";
import Contact, { loader as contactLoader } from "./routes/Contact";
import Edit, { action as editAction } from "./routes/Edit";
import { action as deleteAction } from "./routes/destroy";
import Index from "./routes/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <Edit />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
