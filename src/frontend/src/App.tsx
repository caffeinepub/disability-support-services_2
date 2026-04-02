import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});
const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$id",
  component: ServiceDetailPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  serviceDetailRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { serviceDetailRoute };

export default function App() {
  return <RouterProvider router={router} />;
}
