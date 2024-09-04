import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import datas from "../../../data/products.json";
import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/Layout";
import IcoAdress from "./icons/IcoAdress";
import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLogout from "./icons/IcoLogout";
import IcoPassword from "./icons/IcoPassword";
import IcoPeople from "./icons/IcoPeople";
import AddressesTab from "./tabs/AddressesTab";
import Dashboard from "./tabs/Dashboard";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
import ProfileTab from "./tabs/ProfileTab";
import ReviewTab from "./tabs/ReviewTab";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");

  const navigate = useNavigate();

  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);

  const handleNavigation = (section) => {
    setSidebarOpen(false); // Close sidebar on navigation
    navigate(`/profile#${section}`); // Navigate to the appropriate section
  };

  const LogOut = () => {
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full">
        <div className="container-fluid mx-auto">
          <div className="w-full my-10">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "profile", path: "/profile" },
              ]}
            />
            <div className="w-full bg-white px-10 py-9">
              <div className="title-area w-full flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-qblack">
                  Your Dashboard
                </h1>
                <button
                  className="md:hidden text-qblack"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? 'Close' : 'Menu'}
                </button>
              </div>
              <div className="profile-wrapper w-full mt-8 flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className={`md:w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)] ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                  <div className="flex flex-col space-y-10">
                    <div className="item group">
                      <div
                        onClick={() => handleNavigation("dashboard")}
                        className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer"
                      >
                        <span>
                          <IcoDashboard />
                        </span>
                        <span className="font-normal text-base">
                          Personal Info
                        </span>
                      </div>
                    </div>
                    {/* <div className="item group">
                      <div
                        onClick={() => handleNavigation("profile")}
                        className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer"
                      >
                        <span>
                          <IcoPeople />
                        </span>
                        <span className="font-normal text-base">
                          Personal Info
                        </span>
                      </div>
                    </div> */}
                    {/* Other Sidebar Items */}
                    <div className="item group">
                      <div
                        onClick={() => handleNavigation("order")}
                        className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer"
                      >
                        <span>
                          <IcoCart />
                        </span>
                        <span className="font-normal text-base">Order</span>
                      </div>
                    </div>
                    <div className="item group">
                      <div
                        onClick={() => handleNavigation("address")}
                        className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer"
                      >
                        <span>
                          <IcoAdress />
                        </span>
                        <span className="font-normal text-base">
                          Address
                        </span>
                      </div>
                    </div>
                    <div className="item group">
                      <div
                        onClick={() => handleNavigation("password")}
                        className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer"
                      >
                        <span>
                          <IcoPassword />
                        </span>
                        <span className="font-normal text-base">
                          Change Password
                        </span>
                      </div>
                    </div>
                    <div className="item group">
                      <div className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer" onClick={LogOut}>
                        <span>
                          <IcoLogout />
                        </span>
                        <span className="font-normal text-base">
                          Log out
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Main Content */}
                <div className="flex-1">
                  <div className="item-body dashboard-wrapper w-full">
                    {active === "dashboard" ? (
                      <Dashboard />
                    ) : active === "profile" ? (
                      <ProfileTab />
                    ) : active === "payment" ? (
                      <Payment />
                    ) : active === "order" ? (
                      <OrderTab />
                    ) : active === "wishlist" ? (
                      <WishlistTab />
                    ) : active === "address" ? (
                      <AddressesTab />
                    ) : active === "password" ? (
                      <PasswordTab />
                    ) : active === "support" ? (
                      <SupportTab />
                    ) : active === "review" ? (
                      <ReviewTab products={datas.products} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
