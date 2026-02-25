import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingsList from './pages/BookingsList';
import PatientDatabase from './pages/PatientDatabase';
import About from './pages/About';

// Root route with Layout wrapper
const rootRoute = createRootRoute({
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});

const bookingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/booking',
    component: Booking,
});

const bookingsListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/bookings',
    component: BookingsList,
});

const patientsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/patients',
    component: PatientDatabase,
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    bookingRoute,
    bookingsListRoute,
    patientsRoute,
    aboutRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    return <RouterProvider router={router} />;
}
