import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./loader.css";
import Swal from "sweetalert2";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
import { User } from "./user";
const InputToDo = () => {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loader, setLoader] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }
    if (!user) return;

    const taskLS = JSON.parse(localStorage.getItem(`tasks_${user.uid}`));
    if (taskLS) {
      setTask(taskLS);
    }

    const unsubscribe = onSnapshot(
      collection(db, `users/${user.uid}/tasks`),
      (snapshot) => {
        setLoader(true);
        const saveTask = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTask(saveTask);
        setLoader(false);
      }
    );

    return () => unsubscribe();
  }, [user, navigate, loading]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user.uid}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const addTask = async () => {
    if (newTask.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Tarea vacía",
        text: "No puedes agregar una tarea sin contenido.",
      });
      return;
    }
    await addDoc(collection(db, `users/${user.uid}/tasks`), {
      text: newTask,
      completed: false,
    });
    setNewTask("");
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, `users/${user.uid}/tasks`, id));
  };

  const showSwal = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará esta tarea",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "La tarea ha sido eliminada.",
          icon: "success",
        });
      }
    });
  };

  const toggleComplete = async (id, completed) => {
    await updateDoc(doc(db, `users/${user.uid}/tasks`, id), {
      completed: !completed,
    });
  };

  function handleInput(e) {
    setNewTask(e.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 ">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <User />

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
        <h1 className="text-gray-900 text-4xl font-semibold mb-6">
          To Do List
        </h1>
        <div className="bg-white shadow-lg rounded-lg w-1/3 p-4 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={handleInput}
            placeholder="Nueva tarea"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Agregar
          </button>
        </div>
        {loader ? (
          <div className="loader mt-14"></div>
        ) : (
          <div className="w-6/12 mx-auto space-y-4">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="bg-white shadow-md rounded-lg p-4 font-mono flex items-center justify-between w-full"
              >
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t.id, t.completed)}
                  className="mr-4"
                />
                <div
                  className={`flex-1 ${
                    t.completed ? "text-gray-500 line-through" : "text-gray-900"
                  } w-9/12 m-2 ml-2 mr-2 font-sans font-medium text-lg break-words`}
                >
                  {t.text}
                </div>
                <button
                  onClick={() => showSwal(t.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputToDo;
