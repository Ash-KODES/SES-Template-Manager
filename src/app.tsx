import "./app.css";
import {Router, Route } from 'preact-router';
import Home from "./page/Home/Home";
import Auth from "./page/auth/Auth";


export function App() {

  return (
    <Router>
    <Route path="/" component={Home}/>
    <Route path="/auth" component={Auth}/>

    </Router>
  );
}
