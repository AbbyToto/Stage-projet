
//External import
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

//Internal import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={themeSettings()}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;