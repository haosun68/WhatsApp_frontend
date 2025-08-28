import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { setMockUser } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (!user?.token) {
      dispatch(setMockUser());
    }
  }, [dispatch, user?.token]);
  
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