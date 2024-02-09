import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./Pages/Dashboard"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
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
    </Route>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App