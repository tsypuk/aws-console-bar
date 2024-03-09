import React from "react";
import ReactDOM from 'react-dom'

import './popup.css'
import {createRoot} from "react-dom/client";

const test = <img src="images/icon128.png.png"/>

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);
const root = createRoot(rootEl);
root.render(test)