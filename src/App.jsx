import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./Pages/Dashboard"
import SignIn from "./Pages/SignIn"
import GlobalStyles from "./styles/GlobalStyles"

function App() {
  return (
    <>
  <GlobalStyles />
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App