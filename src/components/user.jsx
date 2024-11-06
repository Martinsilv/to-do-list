import { motion } from "framer-motion";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div>
      <div className="absolute top-0 right-0 p-4 flex items-center space-x-4">
        {user && (
          <>
            {/* Mostrar la foto si el usuario la tiene (por ejemplo, si se autenticó con Google) */}
            {user.photoURL && (
              <motion.img
                src={user.photoURL}
                alt="User Profile"
                className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Mostrar el correo o nombre del usuario */}
            <h1 className="text-gray-900 font-semibold">
              Hola, {user.displayName || user.email}
            </h1>

            {/* Botón para salir */}
            <motion.button
              onClick={handleLogOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-50 shadow-md"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
            >
              Salir
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};
