import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeRoutes";
import { DashboardRoutes } from "./ManagerRoutes";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

export function Routes(){

    const {session, isLoading} = useAuth()

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