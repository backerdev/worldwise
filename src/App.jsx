import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import City from "./components/City";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import NotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import Homepage from "./pages/Homepage";
// import AppLayout from "./pages/AppLayout";

import Protected_Route from "./pages/Protected_Route";
import CityList from "./components/citylist/CityList";
import Form from "./components/form/Form";
import CountryList from "./components/countryList/CountryList";
import City from "./components/city/City";
import { CityProvider } from "./contexts/CityContext _combineReducer";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { Suspense, lazy } from "react";
import Spinner from "./components/SpinnerFullPage";
// import { CityProvider } from "./contexts/CityContext";

// Lazy loading

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const NotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

export default function App() {
  return (
    <CityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route
                path="app"
                element={
                  <Protected_Route>
                    <AppLayout />
                  </Protected_Route>
                }
              >
                {/* <Route index path="cities" element={<City />} /> */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                {/* <Route path="countries" element={<CountryItem />} /> */}
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CityProvider>
  );
}
