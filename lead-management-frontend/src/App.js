import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Register } from "./containers/Register";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import { Administration } from "./containers/Administration";
import { LeadCapture } from "./containers/LeadCapture";
import { LeadTracker } from "./containers/LeadTracker";
import { Dashboard } from "./containers/Dashboard";
import { Search } from "./containers/Search";
import { NoPageFound } from "./containers/NoPageFound";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userAccess = useSelector((state) => state.auth.user.access);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  if (userAccess === "sales") {
    return (
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadtracker"
            element={
              <PrivateRoute>
                <LeadTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadcapture/"
            element={
              <PrivateRoute>
                <LeadCapture />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NoPageFound />} />
          <Route path="/signin/" element={<Signin />} />
        </Routes>
      </React.Fragment>
    );
  } else if (userAccess === "admin") {
    return (
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Administration />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadtracker"
            element={
              <PrivateRoute>
                <LeadTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadcapture"
            element={
              <PrivateRoute>
                <LeadCapture />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NoPageFound />} />
          <Route path="/signin/" element={<Signin />} />
        </Routes>
      </React.Fragment>
    );
  } else if (userAccess === "superuser") {
    return (
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/administration"
            element={
              <PrivateRoute>
                <Administration />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadtracker"
            element={
              <PrivateRoute>
                <LeadTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadcapture"
            element={
              <PrivateRoute>
                <LeadCapture />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NoPageFound />} />
          <Route path="/signin/" element={<Signin />} />
        </Routes>
      </React.Fragment>
    );
  } else if (userAccess === "user") {
    return (
      <React.Fragment>
        <Routes>
          <Route
            path="/leadtracker"
            element={
              <PrivateRoute>
                <LeadTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <LeadCapture />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NoPageFound />} />
          <Route path="/signin/" element={<Signin />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/administration"
            element={
              <PrivateRoute>
                <Administration />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadtracker"
            element={
              <PrivateRoute>
                <LeadTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/leadcapture"
            element={
              <PrivateRoute>
                <LeadCapture />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NoPageFound />} />
          <Route path="/signin/" element={<Signin />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
