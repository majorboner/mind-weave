import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById('root')!);

root.render(<StrictMode><h1>Hello Mr. World</h1></StrictMode>);
