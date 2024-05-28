import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./hooks/AuthProvider.jsx";
import PrivateRoute from "./router/route.jsx";
import AccessPdf from "./components/AccessPdf";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Other routes */}
            <Route path="/register" element={<Register/>} />
            <Route path="/pdf/:pdfId" element={<AccessPdf/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;