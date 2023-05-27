import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans";
import HostVanDetailLayout from "./components/HostVanDetailLayout"
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="about" element={<About/>}></Route>
          <Route path="vans" element={<Vans/>}></Route>
          <Route path="vans/:id" element={<VanDetail/>}></Route>
          <Route path="host" element={<HostLayout/>}>
            <Route index element={<Dashboard/>}></Route>
            <Route path="income" element={<Income/>}></Route>
            <Route path="vans" element={<HostVans/>}></Route>
            <Route path="vans/:id" element={<HostVanDetailLayout/>}>
              <Route index element={<HostVanInfo/>}></Route>
              <Route path="pricing" element={<HostVanPricing/>}></Route>
              <Route path="photos" element={<HostVanPhotos/>}></Route>
            </Route>
            <Route path="reviews" element={<Reviews/>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
