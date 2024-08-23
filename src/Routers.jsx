import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import AllProductPage from "./components/AllProductPage";
import Login from "./components/Auth/Login/index";
import Profile from "./components/Auth/Profile";
import Signup from "./components/Auth/Signup";
import Blogs from "./components/Blogs";
import Blog from "./components/Blogs/Blog.jsx";
import CardPage from "./components/CartPage";
import CheakoutPage from "./components/CheakoutPage";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import FourZeroFour from "./components/FourZeroFour";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SingleProductPage from "./components/SingleProductPage";
import TermsCondition from "./components/TermsCondition/index";
import TrackingOrder from "./components/TrackingOrder";
import Wishlist from "./components/Wishlist";
import HomeThree from "./components/HomeThree";
import OrderSuccess from "./components/Success/odrer-success.jsx";
import OrderDetails from "./components/Auth/Profile/tabs/OrderDetails.jsx";
import Category from "./components/Category.jsx";
import OfferProducts from "./components/OfferProducts.jsx";
import MainCategory from "./components/Main-category.jsx"
import ForgetPassword from "./components/Auth/Login/Forget-password.jsx";
import OtpVeriFication from "./components/Auth/Login/otp-verification.jsx";
import PasswordCreation from "./components/Auth/Login/password-creation.jsx";
import ScrollTop from "./components/Partials/Headers/HeaderOne/ScrollToTop.jsx"
import Maintance from './components/Maintance.jsx'







const router = createBrowserRouter([
  {
    element: <ScrollTop />,
    children: [
      { path: "/", element: <HomeThree /> },
      { path: "/category/:id", element: <Category /> },
      { path: "/offer-products/", element: <OfferProducts /> },
      { path: "/main-category/:id", element: < MainCategory/> },
      { path: "/single-product/:id", element: <SingleProductPage /> },
      { path: "/all-products/", element: <AllProductPage /> },
      { path: "/order-success/", element: <OrderSuccess /> },
      { path: "/cart", element: <CardPage /> },
      { path: "/checkout/:id/", element: <CheakoutPage /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/about", element: <About /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blogs/blog", element: <Blog /> },
      { path: "/tracking-order", element: <TrackingOrder /> },
      { path: "/contact", element: <Contact /> },
      { path: "/faq", element: <Faq /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <Profile /> },,
      { path: "/be-coin", element: <PrivacyPolicy /> },
      { path: "/privacy-policy", element: <TermsCondition /> },
      { path: "/orderDetails/:id", element: <OrderDetails /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
      { path: "/otp-verification/:id", element: <OtpVeriFication /> },
      { path: "/new-password/:id", element: <PasswordCreation /> },
      { path: "/maintenance", element: <Maintance /> },
      { path: "*", element: <FourZeroFour /> },
    ],
  },
]);

function Routers() {
  return <RouterProvider router={router} />;
}

export default Routers;
