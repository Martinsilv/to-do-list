export const AlertError = (error) => {
  if (error.code === "auth/invalid-email") {
    return "Correo inválido";
  }
  if (error.code === "auth/weak-password") {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (error.code === "auth/email-already-in-use") {
    return "Este correo ya está registrado";
  }
  if (error.code === "auth/network-request-failed") {
    return "Error de red/conexión";
  }
  if (error.code === "auth/missing-password") {
    return "No ingresó su contraseña";
  }
  if (error.code === "auth/missing-email") {
    return "No ingresó su Email";
  }
  if (error.code === "auth/invalid-credential") {
    return "Las credenciales proporcionadas no son válidas o este usuario no está registrado";
  }

  return "Ha ocurrido un error inesperado";
};
