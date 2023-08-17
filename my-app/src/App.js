import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
// import FormPage from "./phps/FormPage";
import Form from "./country/Form";

function App(){
    return(
        <div>
                  <BrowserRouter>
               <Routes>
                 <Route path='/'element={<Form></Form>}></Route>
               </Routes>
          </BrowserRouter>


        </div>
    )
}
export default App;