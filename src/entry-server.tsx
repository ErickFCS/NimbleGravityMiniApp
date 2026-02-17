import Main from "./Main";
import { renderToString } from "react-dom/server";


export const render = (url: string): {
  head: string | boolean,
  body: string | boolean
} => {
  const validURLs = ["/"];
  if (!validURLs.includes(url)) return { body: false, head: false };
  const head = "";
  const body = renderToString(<Main />);
  return { body, head };
};
