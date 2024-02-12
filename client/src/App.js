import React from "react";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import { hot } from "react-hot-loader/root";

import { Main } from "./Main";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const App = hot(() => {
  return (
    <ExtensionProvider>
      <Main />
    </ExtensionProvider>
  );
});
