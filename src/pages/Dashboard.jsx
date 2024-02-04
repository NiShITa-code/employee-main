import AddCabin from "../components/AddCabin"
import AddEmployee from "../components/AddEmployee"
import DashboardTable from "../components/DashboardTable"
import Heading from "../reusable_ui/Heading"
import Row from "../reusable_ui/Row"

function Dashboard() {
  
    
    return (
        <>
        <Row>
            <Heading as='h1' className="text-center">All Employees</Heading>
        </Row>
        <Row>
            <AddEmployee/>
            <DashboardTable/>
            
        </Row>
        </>
    )
}

export default Dashboard
