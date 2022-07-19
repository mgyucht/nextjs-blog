import { AppProps } from "next/app";
import "../styles/global.css";

// For Font Awesome, see https://fontawesome.com/docs/web/use-with/react/use-with
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
