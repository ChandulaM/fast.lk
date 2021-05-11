import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Nevbar";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      {" "}
      <div className="App">
        <Route path="/" exec component={Navbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Route path="/" exec component={Footer} />
      </div>
    </Router>
  );
}

export default App;
