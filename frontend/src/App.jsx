import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing.jsx";
import Search from "./components/Search.jsx";
import Navbar from "./Nav.jsx";

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <Landing /> },
    { path: "/search", element: <Search /> },
  ];
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

function App() {
  return (
    <div className="h-full">
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
