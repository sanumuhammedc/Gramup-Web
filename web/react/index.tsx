import { Workbox } from "workbox-window";
import ReactDOM from "react-dom";
import { HandleAppState } from "./components/HandleAppState";
import SignIn from "./routes/SignIn";
import Telegram from "./utils/telegram";

const wb = new Workbox("sw.js");
const client = new Telegram(process.env.TELEGRAM_API_ID, process.env.TELEGRAM_API_HASH);

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
            <SignIn client={client} />
        </>
    );
};

ReactDOM.render(<App wb={wb} />, document.getElementById("root"));
    
