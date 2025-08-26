import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeRoutes";
import { DashboardRoutes } from "./ManagerRoutes";
import { Loading } from "../components/Loading";

const isLoading = false
// const session = undefined

const session = {
   user: {
    role: ""
   } 
}

export function Routes(){

    function Route(){

        switch (session?.user.role) {
            case "manager":
                return <DashboardRoutes/>
            case "employee":
                return <EmployeeRoutes/>
            default:
                return <AuthRoutes/>
        }
    }

    if (isLoading) return <Loading/>
    
    return (
        <BrowserRouter>
            <Route/>
        </BrowserRouter>
    )
}