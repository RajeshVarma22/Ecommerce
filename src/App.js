import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartOrderConformation from "./components/OrderDetails/CartOrderConformation";
import Cloths from "./components/Clothes/Cloths";
import ConformOrder from "./components/OrderDetails/ConformOrder";
import EachLaptopList from "./components/Electronics/Laptops/EachLaptopList";
import EachMobileList from "./components/Electronics/Mobiles/EachMobileList";
import ElectronicsMain from "./components/Electronics/ElectronicsMain";
import TestingHere from "./components/Examples/TestingHere";
import Home from "./components/Home/Home";
import Laptops from "./components/Electronics/Laptops/Laptops";
import Login from "./components/Auth/Login";
import LogOut from "./components/Auth/LogOut";
import MobilesMain from "./components/Electronics/Mobiles/MobilesMain";
import Navbar from "./components/Navbar/Navbar";
import OnePlus from "./components/Electronics/Mobiles/OnePlus";
import ShowEachClothes from "./components/Clothes/ShowEachClothes";
import ShowSelectedContent from "./components/Electronics/Mobiles/ShowSelectedContent";
import ShowSelectedLaptop from "./components/Electronics/Laptops/ShowSelectedLaptop";
import SignUp from "./components/Auth/SignUp";
import Tstng from "./components/Checking/Tstng";
import EmptyData from "./components/EmptyData/EmptyData";
import ProductOrdered from "./components/ProductsOrdered/ProductOrdered";
import HomeSuggestions from "./components/Home/HomeSuggestions/HomeSuggestions";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState();
  const [userLogIn, setUserLogIn] = useState();

  return (
    <>
      <Router>
        <Navbar />
        <div className="mt-3">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={
                <Login
                  getEmail={setEmail}
                  getLogIn={setUserLogIn}
                  getPassword={setPassword}
                  getUserId={setId}
                />
              }
            />

            <Route path="/" element={<Home />} />

            <Route path="/electronics">
              <Route index element={<ElectronicsMain />} />
              <Route path="laptops">
                <Route index element={<Laptops />} />
                <Route path=":path">
                  <Route index element={<EachLaptopList />} />
                  <Route
                    path=":id"
                    element={<ShowSelectedLaptop userLogin={userLogIn} />}
                  />
                </Route>
                <Route path="dellLaptops" element={<EmptyData />} />
                <Route path="asusLaptops" element={<EmptyData />} />
              </Route>
            </Route>

            <Route path="/clothes">
              <Route index element={<Cloths />} />
              <Route path=":path" element={<ShowEachClothes />} />
            </Route>

            <Route path="/mobiles">
              <Route index element={<MobilesMain />} />
              <Route path=":path">
                <Route index element={<EachMobileList />} />
                <Route
                  path=":id"
                  element={<ShowSelectedContent userLogin={userLogIn} />}
                />
              </Route>
            </Route>

            <Route path="/cart" element={<Cart />} />

            <Route path="/orderConformation" element={<ConformOrder />} />

            <Route
              path="/ordersConformation"
              element={<CartOrderConformation />}
            />

            <Route path="/orders" element={<ProductOrdered />} />

            <Route path="/n" element={<HomeSuggestions />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
