import GeneralError from "features/error/GeneralError";
import Home from "features/home/Home";
import ProtectedLayout from "layouts/ProtectedLayout";
import PublicLayout from "layouts/PublicLayout";
import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Loader from "./Loader";

const Login = lazy(() => import("../features/login/Login"));
const UserList = lazy(() => import("../features/manage/Manage"));

const ProtectedRoute = () => {
  return (
    <ProtectedLayout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </ProtectedLayout>
  );
};

const PublicRoute = () => {
  return (
    <PublicLayout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/manage" element={<UserList />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Error */}
      <Route path="/forbidden" element={<GeneralError type="403" />} />
      <Route path="*" element={<GeneralError type="404" />} />
    </Routes>
  );
};

export default AppRouter;
