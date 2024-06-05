import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Note from "./components/NotesPage/NotesPage";

function App() {
  const isAuth = useSelector((state) => state.user.authUser);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/notes"
            element={isAuth ? <Note /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
