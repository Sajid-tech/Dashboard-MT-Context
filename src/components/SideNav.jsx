/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
const SideNav = ({ openSideNav, setOpenSideNav, brandName }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();

  // Hardcoded sidenavType to "dark"
  const sidenavType = "dark";

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-blue-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // const filteredRoutes = routes.filter((route) => route.layout !== "auth");

  // close sidebar when clicking outside

  useEffect(() => {
    function handClickOutside(e) {
      if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
        setOpenSideNav(false);
      }
    }

    document.addEventListener("mousedown", handClickOutside);
    return () => {
      document.removeEventListener("mousedown", handClickOutside);
    };
  }, [setOpenSideNav]);

  // Close sidebar on route change
  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSideNav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color="white" // Hardcoded to "white" for dark sidenav
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSideNav(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <NavLink to="/">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <HomeIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Dashboard
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/registration">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Registration
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/participant">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color="white"
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <TableCellsIcon className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Participants
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          {/* Add more hardcoded routes here as needed */}
        </ul>
      </div>
    </aside>
  );
};

SideNav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

SideNav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  openSidenav: PropTypes.bool.isRequired,
  setOpenSidenav: PropTypes.func.isRequired,
};
export default SideNav;
