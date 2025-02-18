import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth.js";
import UpdateProfile from "../components/UpdateProfile.jsx";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //
  const handleLogout = async () => {
    // Implement your logout logic here
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
    });
    localStorage.removeItem("token");
  };
  //
  const handleVerification = async () => {
    await emailVerification();
    alert("E-posta onaylandı!");
    // Handle the email verification success or failure here
  };
  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL && (
            <img src={user.photoURL} className="size-10 rounded-full" />
          )}
          Oturumun Açık, ({user.email})
          {user.emailVerified && (
            <RiVerifiedBadgeFill className="text-blue-500" />
          )}
          <button
            onClick={handleLogout}
            className="whitespace-nowrap h-8 rounded px-4 text-sm text-white bg-indigo-500"
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="whitespace-nowrap h-8 rounded px-4 text-sm text-white bg-indigo-500"
            >
              E-posta Onayla
            </button>
          )}
        </h1>
        <UpdateProfile />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen  ">
      <Link
        className="bg-blue-600  hover:bg-blue-400 text-white shadow-lg m-5 px-4 py-2 rounded-lg"
        to="/register"
      >
        Kayıt Ol
      </Link>
      <Link
        className="bg-green-600 hover:bg-green-400 text-white shadow-lg m-5 px-4 py-2 rounded-lg"
        to="/login"
      >
        Giriş Yap
      </Link>
    </div>
  );
};

export default Home;
