import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./Pages/Dashboard"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import EmployeeDetails from "./pages/EmployeeDetail"
import GlobalStyles from "./styles/GlobalStyles"
import ProtectedRoutes from "./components/ProtectedRoutes"

function App() {
  return (
    <>
  <GlobalStyles />
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route element={<ProtectedRoutes/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/employee-details/:email" element={<EmployeeDetails/>}/>
      
    </Route>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App