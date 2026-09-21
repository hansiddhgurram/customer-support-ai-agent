import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import TicketAnalysis from "./pages/TicketAnalysis";
import Incidents from "./pages/Incidents";
import KnowledgeBase from "./pages/KnowledgeBase";
import Clusters from "./pages/Clusters";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

function App() {

  const { theme } = useTheme();

  return (

    <Routes>

      <Route

        path="/login"

        element={<Login />}

      />

      <Route
      
        path="/register"

        element={<Register />}

      />

      <Route

        path="*"

        element={

          <ProtectedRoute>

            <div
              className={`flex min-h-screen transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-[#020617]"
                  : "bg-slate-100"
              }`}
            >

              <Sidebar />

              <div className="flex-1">

                <Header />

                <div className="p-10">

                  <Routes>

                    <Route
                      path="/"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/analysis"
                      element={<TicketAnalysis />}
                    />

                    <Route
                      path="/incidents"
                      element={<Incidents />}
                    />

                    <Route
                      path="/knowledge-base"
                      element={<KnowledgeBase />}
                    />

                    <Route
                      path="/clusters"
                      element={<Clusters />}
                    />

                    <Route
                      path="/settings"
                      element={<Settings />}
                    />

                  </Routes>

                </div>

              </div>

            </div>

          </ProtectedRoute>
        }

      />

    </Routes>

  );
}

export default App;