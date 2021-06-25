import { Workbox } from "workbox-window";
import ReactDOM from "react-dom";
import HandleAppState from "./components/HandleAppState";

const wb = new Workbox("sw.js");

if ("serviceWorker" in navigator) 
    wb.register();

const App = ({wb}: { wb: Workbox; }) => 
{
    return (
        <>
            <HandleAppState wb={wb} /> 
            <h1>React TypeScript Webpack Starter Template</h1>
        </>
    );
};

ReactDOM.render(<App wb={wb} />, document.getElementById("root"));
    
