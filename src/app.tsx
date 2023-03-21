import "@css/index.css";
import { Router, Route } from "preact-router";
import Home from "@page/Home";
import Auth from "@page/Auth";

export function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
    </Router>
  );
}
