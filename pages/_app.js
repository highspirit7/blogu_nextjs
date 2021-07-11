// import '../styles/globals.css'
import ThemeProvider from "providers/ThemeProvider";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faSun,
  faMoon,
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
library.add(
  faSun,
  faMoon,
  faList,
  faBorderAll,
  faSortNumericDown,
  faSortNumericUp,
);

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/index.scss";
import "highlight.js/styles/base16/tomorrow-night.css";
import "react-toggle/style.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
