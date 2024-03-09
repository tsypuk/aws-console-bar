import React from "react";
import ReactDOM from 'react-dom'
import './options.css'
import {createRoot} from "react-dom/client";
const popup = <p>Hello</p>

// const root = document.createElement('div')
// document.body.appendChild(root)
// ReactDOM.render(popup, root)

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);
const root = createRoot(rootEl);
root.render(popup)