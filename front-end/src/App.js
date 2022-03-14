import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import Write  from './pages/write/Write';
import Settings from './pages/settings/Settings';
import PostDetail from "./components/PostDetail/PostDetail";
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            { user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">
            { user ? <Home /> : <Login />}
          </Route>
          <Route path="/write">
            { user ? <Write /> : <Register />}
          </Route>
          <Route path="/settings">
            { user ? <Settings /> : <Register />}
          </Route>
          <Route path="/post/:postID">
            <PostDetail />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
