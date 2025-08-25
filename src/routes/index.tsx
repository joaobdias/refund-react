import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeRoutes";

export function Routes(){
    return (
        <BrowserRouter>
            <EmployeeRoutes />
        </BrowserRouter>
    )
}