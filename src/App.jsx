import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route element={<Home />} path="/" exact />
                        </Route>
                        <Route element={<Login />} path="/login" />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
