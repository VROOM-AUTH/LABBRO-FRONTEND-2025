import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import TopNavigation from "./components/TopNavigation";
import { UsersProvider } from "./context/UsersContext";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        {/* All other routes will have UsersProvider */}
                        <Route element={<PrivateRoutes />}>
                            <Route element={<UsersProvider />}>
                                <Route path="/" element={<Home />} exact />
                                <Route
                                    path="/profile"
                                    element={<Profile />}
                                    exact
                                />
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
