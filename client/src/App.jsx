import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import CategoryDetails from "./components/home/CategoryDetails";
import Details from "./shared/Details";
import CreateEvent from "./components/dashboard/CreateEvent";
import MyEvent from "./components/dashboard/MyEvent";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import AllEvent from "./pages/AllEvent";
import AuthStore from "./zustandStore/useAuthStore";

const App = () => {
  const { checkCurreentUser } = AuthStore();

  useEffect(() => {
    checkCurreentUser();
  }, [checkCurreentUser]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/all-events"
          element={
            <PrivateRoute>
              <AllEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:id"
          element={
            <PrivateRoute>
              <CategoryDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/event-details/:id"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        />
        <Route
          path="/createEvent"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/event-by-user"
          element={
            <PrivateRoute>
              <MyEvent />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
