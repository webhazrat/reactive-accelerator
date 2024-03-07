import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import HomeIcon from "../../assets/icons/home.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import Logout from "../auth/Logout";
import Photo from "../../assets/icons/addPhoto.svg";
import useUser from "../../hooks/useUser";
import { getImagePath } from "../../utils";

export default function Header() {
  const { user } = useUser();
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col gap-5 items-center justify-between sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[100px] lg:max-w-[120px]"
            src={Logo}
            alt="logo"
          />
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/" className="icon-btn">
            <img src={HomeIcon} alt="Home" className="w-4 h-4" />
            Home
          </Link>
          <button className="icon-btn">
            <img
              src={NotificationIcon}
              alt="Notification"
              className="w-4 h-4"
            />
          </button>
          <Logout />

          <Link to="/me">
            <button className="flex-center !ml-6 gap-3">
              <span className="font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <img
                className="h-[32px] w-[32px] rounded-full object-cover  border border-gray-600"
                src={user?.avatar ? getImagePath(user?.avatar) : Photo}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
