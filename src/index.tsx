import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.less";

import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./utils/AuthProvider";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
