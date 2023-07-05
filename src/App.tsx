import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Home from "./components/Home";
import BookShelves from "./components/BookShelves";
import BookDetails from "./components/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/bookshelves",
      element: (
        <ProtectedRoute>
          <BookShelves />
        </ProtectedRoute>
      ),
    },
    {
      path: "/bookdetails/:id",
      element: (
        <ProtectedRoute>
          <BookDetails />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
