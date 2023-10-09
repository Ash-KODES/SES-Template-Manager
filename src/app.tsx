import "@css/index.css";
import {
  Router,
  Route,
  RouterOnChangeArgs,
  getCurrentUrl,
} from "preact-router";
import Home from "@page/Home";
import Auth from "@page/Auth";
import AddTemplate from "@page/AddTemplate";
import { useState } from "preact/hooks";
import EditTemplate from "@page/EditTemplate";
import { setupSesClient } from "@api/ses";
import ls from "localstorage-slim";

export function App() {
  let [currentUrl, setcurrentUrl] = useState(getCurrentUrl());
  const accessKeyId = ls.get("auth_accessKeyID");
  const secretAccessKey = ls.get("auth_secretAccessKey");

  const publicRoute = ["/auth"];

  if (
    !publicRoute.includes(currentUrl) &&
    (accessKeyId === null || secretAccessKey === null)
  ) {
    setcurrentUrl("/auth");
  }

  if (accessKeyId !== null && secretAccessKey !== null) {
    setupSesClient({
      accessKeyId: accessKeyId as string,
      secretAccessKey: secretAccessKey as string,
    });
  }

  return (
    <Router
      url={currentUrl}
      onChange={(e: RouterOnChangeArgs) => setcurrentUrl(e.url)}
    >
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/new" component={AddTemplate} />
      <Route path="/edit/:templateName" component={EditTemplate} />
    </Router>
  );
}
