import "./App.css";
import Registration from "./components/forms/Registration";
import Header from "./components/common/header/Header";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import { RequireAuth } from "./components/RequireAuth";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <Header></Header>
          <div className="container">
            <Routes>
              <Route path="/" element={<Registration />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
