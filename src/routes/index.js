import GeneralError from "features/error/GeneralError";
import ProtectedLayout from "layouts/ProtectedLayout";
import PublicLayout from "layouts/PublicLayout";
import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Loader from "./Loader";

const Login = lazy(() => import("../features/login/Login"));
const AboutUs = lazy(() => import("../features/about-us/AboutUs"));
const Home = lazy(() => import("../features/home/Home"));
const Portfolio = lazy(() => import("../features/portfolio/Portfolio"));

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
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Route>

      {/* Error */}
      <Route path="/forbidden" element={<GeneralError type="403" />} />
      <Route path="*" element={<GeneralError type="404" />} />
    </Routes>
  );
};

export default AppRouter;
