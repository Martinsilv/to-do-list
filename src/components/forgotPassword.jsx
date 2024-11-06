import { motion } from "framer-motion";
import { useAuth } from "./Context/authContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (email.trim() === "") {
      return Swal.fire(
        "Error",
        "Por favor ingrese su correo electrónico",
        "error"
      );
    }

    setIsLoading(true);

    try {
      // Intentamos directamente resetear la contraseña
      await resetPassword(email);

      Swal.fire(
        "Correo enviado correctamente",
        "Revise su correo para recuperar su contraseña",
        "success"
      );
    } catch (error) {
      console.log("Error al intentar enviar el correo:", error);

      // Manejamos diferentes tipos de errores
      let errorMessage =
        "Ha ocurrido un problema al recuperar su contraseña, inténtelo nuevamente";

      if (error.code === "auth/user-not-found") {
        errorMessage = "Este correo electrónico no está registrado";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "El formato del correo electrónico no es válido";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Demasiados intentos. Por favor, intente más tarde";
      }

      Swal.fire("Error", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" },
    tap: { scale: 0.9 },
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center animated-background">
        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Recupera tu cuenta
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <motion.input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              />
            </div>

            <motion.button
              type="button"
              className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              variants={buttonVariants}
              whileHover={isLoading ? {} : "hover"}
              whileTap={isLoading ? {} : "tap"}
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </motion.button>
          </form>
          <Link
            to="/login"
            className="text-blue-800 hover:text-blue-500 flex items-center justify-center"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
