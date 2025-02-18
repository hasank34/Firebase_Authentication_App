import { useDispatch, useSelector } from "react-redux";
import { update, auth, resetPassword } from "../firebase";
import { useState } from "react";
import { login } from "../store/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };
  return (
    <div className="gap-y-10">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto grid gap-y-4 py-4"
      >
        <h1 className="text-xl font-bold mb-4 ">Profili Güncelle</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Adı-Soyadı
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="John Doe"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fotoğraf
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            className="disabled:opacity-30 inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Profili Güncelle
          </button>
        </div>
      </form>
      <h1 className="text-xl font-bold mb-4 ">Parolayı Güncelle</h1>
      <form
        onSubmit={handleReset}
        className="max-w-xl mx-auto grid gap-y-4 py-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parola
          </label>
          <div className="mt-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi güncelleyebilirsiniz."
            />
          </div>
        </div>

        <div>
          <button
            disabled={!password}
            className="disabled:opacity-30 inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Şifreyi Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
