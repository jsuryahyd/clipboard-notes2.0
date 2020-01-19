import hljs from 'highlight.js';

import App from "../svelte/Popup.svelte";


import "../css/quill.snow.css";
import "../css/highlight-atom-one-dark.css";
import "../css/popup.css";


hljs.configure({   // optionally configure hljs
  languages: ['javascript', 'ruby', 'python']
});
const app = new App({
  target: document.body,
  props: {
    name: "Surya",
    appTitle: "Clip Board And Notes 2.0"
  }
});

window.app = app;

export default app;
