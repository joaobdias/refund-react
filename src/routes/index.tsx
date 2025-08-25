import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";

export function Routes(){
    return (
        <BrowserRouter>
            <AuthRoutes/>
        </BrowserRouter>
    )
}