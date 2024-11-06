import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import InputToDo from "./components/inputToDo";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { AuthProvider } from "./components/Context/authContext";
import { ForgotPassword } from "./components/forgotPassword";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<InputToDo />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
