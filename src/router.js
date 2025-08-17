// router.tsx
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Home from "./containers/Home";
import Error404 from "./containers/Error404";
import Member from "./containers/Member";
import Business from "./containers/Business";
import Employment from "./containers/Employment";
import Profile from "./containers/Profile";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/miembro" element={<Member/>} />
            <Route path="/negocio" element={<Business/>} />
            <Route path="/empleo" element={<Employment/>} />
            <Route path="/perfil" element={<Profile/>} />
            <Route path="*" element={<Error404 />} />
        </>
    ),
    {
        future: {
            v7_startTransition: true, // <--- Activamos el flag
        },
    }
);