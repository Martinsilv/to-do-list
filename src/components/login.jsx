import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "./background.css";
import { AlertError } from "./alertError";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
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

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" },
    tap: { scale: 0.9 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-background">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Iniciar Sesión
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
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Iniciar Sesión
          </motion.button>
        </form>

        <motion.button
          onClick={handleLoginWithGoogle}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Iniciar sesión con Google
        </motion.button>
        <Link
          to={"/register"}
          className=" text-blue-800 hover:text-blue-500 flex items-center justify-center"
        >
          ¿No te haz registrado? Registrate aqui
        </Link>
        <Link
          to={"/forgotPassword"}
          className=" text-blue-800 hover:text-blue-500 flex items-center justify-center space-x-4"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </motion.div>
    </div>
  );
};
