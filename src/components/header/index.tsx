/* eslint-disable react-hooks/exhaustive-deps */
import * as ROUTES from "constants/routes";
import AssetsContext from "context/assets";
import FirebaseContext from "context/firebase";
import UserContext from "context/user";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Img from "components/img";
import SearchInput from "./search-input";

export default function Header() {
  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { images, getAvatar } = useContext(AssetsContext);

  const history = useHistory();

  useEffect(() => {
    if (!!user?.displayName) {
      getAvatar(user.displayName);
    }
  }, [user]);

  const handleSignOut = () => {
    auth.signOut();
    history.replace(ROUTES.LOGIN);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8 px-2">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="hidden sm:flex text-center items-center cursor-pointer">
            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
              <Img
                skeletonSize={{ width: 103, height: 29 }}
                src={"/images/logo.png"}
                alt="Instagram"
                className="mt-2 w-28"
              />
            </Link>
          </div>
          <div className="text-gray-primary flex items-center mx-8 w-56">
            <SearchInput />
          </div>
          <div className="text-center flex items-center">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={handleSignOut}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="w-8 items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <Img
                      circle
                      skeletonSize={{ width: 32, height: 32 }}
                      className="rounded-full h-8 w-8"
                      src={images[`${user.displayName}.jpg`]}
                      alt={`Profile ${user.displayName}`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <button
                    type="button"
                    className=" font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
