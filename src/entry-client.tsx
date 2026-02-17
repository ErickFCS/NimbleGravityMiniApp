import Main from "./Main";
import { hydrateRoot } from "react-dom/client";


hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Main />
);
