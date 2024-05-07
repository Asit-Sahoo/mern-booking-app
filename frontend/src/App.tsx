import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";

const App=()=>{
  const { isLoggedIn } = useAppContext();
  return(
    <Router>
      <Routes>
        <Route 
        path="/" 
        element={
         
        <Layouts>
          <p>Home page</p>
        </Layouts>
       
        }
        />
        
        <Route 
        path="/search" 
        element={
        <Layouts>
          <p>Search page</p>
        </Layouts>}
        />
       <Route path="/register" element={<Layouts><Register /></Layouts>}/>
       <Route
          path="/sign-in"
          element={
            <Layouts>
              <SignIn />
            </Layouts>
          }
        />

         {isLoggedIn && (
          <>
             <Route
              path="/add-hotel"
              element={
                <Layouts>
                  <AddHotel />
                </Layouts>
              }
              />
              </>
            )}
         
         
       <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
   
    
  );
};
export default App;