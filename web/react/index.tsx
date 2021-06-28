import { Workbox } from "workbox-window";
import ReactDOM from "react-dom";
import { HandleAppState } from "./components/HandleAppState";
import SignIn from "./routes/SignIn";

const wb = new Workbox("sw.js");

if ("serviceWorker" in navigator)
    if(location.hostname !== "localhost") 
        wb.register();
    else
        navigator.serviceWorker.getRegistrations()
            .then(registrations => registrations.forEach(registration => registration.unregister()));    

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
    
