import { render } from "preact";
import "virtual:uno.css";
import { App } from "./app";

render(<App />, document.getElementById("app") as HTMLElement);
