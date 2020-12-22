import "styles/globals.scss";
import type { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fas,
  faArrowUp,
  faArrowDown,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

library.add(fas, faArrowUp, faArrowDown, faPlay, faPause);

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
