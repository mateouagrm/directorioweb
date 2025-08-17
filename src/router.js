// router.tsx
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Home from "./containers/Home";
import Error404 from "./containers/Error404";
import ProdInformation from "./containers/ProdInformation";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:productoSlug" element={<ProdInformation />} />
            <Route path="*" element={<Error404 />} />
        </>
    ),
    {
        future: {
            v7_startTransition: true, // <--- Activamos el flag
        },
    }
);