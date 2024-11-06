import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "./background.css"; // Fondo con el gradiente en movimiento
import { AlertError } from "./alertError";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: AlertError(error),
        footer: "",
      });
    }
  };

  // Variants para la animación de caída
  const containerVariants = {
    hidden: { opacity: 0, y: "-100vh" }, // El formulario comienza fuera de la pantalla, arriba
    visible: {
      opacity: 1,
      y: 0, // El formulario cae al centro
      transition: { type: "spring", stiffness: 90, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" },
    tap: { scale: 0.9 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-background">
      {/* Solo animamos el formulario */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants} // Se usa el variant para animación de caída
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Registro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <motion.input
              type="email"
              name="email"
              placeholder="your@email.com"
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <motion.input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-gren-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Registrarse
          </motion.button>

          <Link
            to={"/login"}
            className="text-blue-800 hover:text-blue-500 flex items-center justify-center"
          >
            ¿Ya tinenes una cuenta?
          </Link>
        </form>
      </motion.div>
    </div>
  );
};
