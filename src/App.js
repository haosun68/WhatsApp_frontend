import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
function App() {
  const { user } = useSelector((state) => state.user);
  console.log("Current user:", user);
  
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route 
            exact 
            path="/" 
            element={user?.token ? <Home /> : <Login />} 
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;