import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route, redirect} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, {loader as vansLoader} from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader} from "./pages/Vans/VanDetail";
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, {loader as hostVansLoader} from "./pages/Host/HostVans";
import HostVanDetailLayout, {loader as hostVanDetailLoader} from "./components/HostVanDetailLayout"
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login from "./pages/Login"
import { requireAuth } from "./utils";

import "./server"

  const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout/>}  errorElement={<Error/>}>
          <Route index element={<Home/>}></Route>
          <Route path="about" element={<About/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route
          path="vans"
          element={<Vans/>}
          loader={vansLoader}
          ></Route>
          <Route
          path="vans/:id"
          element={<VanDetail/>}
          loader={vanDetailLoader}
          ></Route>
          <Route path="host" element={<HostLayout/>} >
            <Route index element={<Dashboard/>} loader={async () =>  {
              await requireAuth()
                return null
              }}></Route>
            <Route path="income" element={<Income/>}></Route>
            <Route
            path="vans"
            element={<HostVans/>}
            loader={hostVansLoader}
            >
            </Route>
            <Route
            path="vans/:id"
            element={<HostVanDetailLayout/>}
            loader={hostVanDetailLoader}
            >
              <Route index element={<HostVanInfo/>}></Route>
              <Route path="pricing" element={<HostVanPricing/>}></Route>
              <Route path="photos" element={<HostVanPhotos/>}></Route>
            </Route>
            <Route path="reviews" element={<Reviews/>}></Route>
          </Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
  ))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}



export default App;
