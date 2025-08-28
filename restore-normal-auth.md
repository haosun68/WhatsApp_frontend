# How to Restore Normal Authentication

When you're done testing and want to go back to real user login, follow these steps:

## Step 1: Remove Auto Mock User

Open `src/App.js` and delete these lines:

```javascript
// Remove this import:
import { setMockUser } from "./features/userSlice";

// Remove this useEffect:
useEffect(() => {
  if (!user?.token) {
    dispatch(setMockUser());
  }
}, [dispatch, user?.token]);
```

Your App.js should look like this:

```javascript
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
```

## Step 2: Clear Browser Storage

1. Press F12 to open DevTools
2. Go to Application tab
3. Find Storage → Local Storage → localhost:3000
4. Delete everything (especially `persist:user`)

## Step 3: Restart Server

Stop your dev server (Ctrl+C) then run:
```bash
npm start
```

## Step 4: Test It

Refresh the page. You should see the login screen instead of going straight to the app.

## Optional: Clean Up Mock User Code

If you don't need the mock user feature anymore, you can remove it from `src/features/userSlice.js`:

```javascript
// Delete the setMockUser reducer and remove it from exports
export const { logout, changeStatus } = userSlice.actions; // no setMockUser
```

---

**Note**: If you want to keep the mock user feature for future testing, just do steps 1-3 and leave the userSlice code alone.
