import './App.css';

import { Route, Link } from "react-router-dom";
import Main from './Routes/main/components/Main';
import Login from './Routes/login/components/Login';
import SignUp from './Routes/login/components/SignUp';


function App() {

  return (
    <div className="App">
        <Route exact path = "/" component={Login}/>
        <Route exact path = "/sign-up" component={SignUp}/>
        <Route exact path = "/main" component={Main}/> 
    </div>
  );
}

export default App;
