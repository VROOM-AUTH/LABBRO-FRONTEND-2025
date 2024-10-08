import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import StaffRoutes from "./utils/StaffRoutes";
import Vroomvolts from "./pages/Vroomvolts";
import SmartLab from "./pages/SmartLab";
import Marathon from "./pages/Marathon";
import Admin from "./pages/Admin";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<ErrorPage />} />
                        {/* All other routes will have UsersProvider */}
                        <Route element={<PrivateRoutes />}>
                            {/* Private routes only for logged in users */}
                            <Route path="/" element={<Home />} exact />
                            <Route
                                path="/vroomvolts"
                                element={<Vroomvolts />}
                                exact
                            />

                            <Route
                                path="/smartlab"
                                element={<SmartLab />}
                                exact
                            />
                            <Route
                                path="/marathon"
                                element={<Marathon />}
                                exact
                            />
                            <Route
                                path="/profile/:id"
                                element={<Profile />}
                                exact
                            />
                            <Route element={<StaffRoutes />}>
                                {/* Staff routes only for is_staff users */}
                                <Route
                                    path="/admin"
                                    element={<Admin />}
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
