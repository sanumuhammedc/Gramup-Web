import { Workbox } from "workbox-window";
import ReactDOM from "react-dom";
import { HandleAppState } from "./components/HandleAppState";
import { SignIn } from "./routes/SignIn";

const wb = new Workbox("sw.js");

if ("serviceWorker" in navigator) 
    wb.register();

const App = ({wb}: { wb: Workbox; }) => 
{
    return (
        <>
            <HandleAppState wb={wb} /> 
            <SignIn />
        </>
    );
};

ReactDOM.render(<App wb={wb} />, document.getElementById("root"));
    
