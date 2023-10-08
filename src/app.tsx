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
  const localData = JSON.parse(ls.get("auth") as string);

  const publicRoute = ["/auth"];

  if (!publicRoute.includes(currentUrl) && localData === null) {
    setcurrentUrl("/auth");
  }

  if (localData !== null) {
    const { accessKeyId, secretAccessKey } = localData;
    setupSesClient({ accessKeyId, secretAccessKey });
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
