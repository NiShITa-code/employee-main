import AddEmployee from "../components/AddEmployee"
import DashboardTable from "../components/DashboardTable"
import Heading from "../reusable_ui/Heading"
import Row from "../reusable_ui/Row"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
    return (
        <>
        <ToastContainer />
        <Row>
            <Heading as='h1' className="text-center">Employee Dashboard</Heading>
        </Row>
        <Row>
            <AddEmployee/>
            <DashboardTable/>
            
        </Row>
        </>
    )
}

export default Dashboard
