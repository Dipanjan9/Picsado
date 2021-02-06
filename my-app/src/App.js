import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar1 from "./components/Navbar1";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import UserProfile from "./components/screens/UserProfile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import SubPosts from "./components/screens/SubPosts";
import { reducer, initialstate } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      //history.push("/");
    } else {
      history.push("/Login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      <Route exact path="/Profile">
        <Profile />
      </Route>
      <Route path="/Signup">
        <Signup />
      </Route>
      <Route path="/CreatePost">
        <CreatePost />
      </Route>
      <Route path="/Profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/SubPosts">
        <SubPosts />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar1 />
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
