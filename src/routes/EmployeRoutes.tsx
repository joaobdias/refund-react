import { Routes, Route } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { Refund } from "../pages/Refund";
import { NotFound } from "../pages/NotFound";
import { Confirm } from "../pages/Confirm";

export function EmployeeRoutes(){
    return (
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="/" element={<Refund/>}/>
                <Route path="/confirm" element={<Confirm/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}