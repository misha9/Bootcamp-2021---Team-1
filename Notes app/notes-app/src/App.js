import './App.css';

import { Route, Link } from "react-router-dom";
import Main from './Routes/main/components/Main';
import Login from './Routes/login/components/Login';


function App() {

  return (
    <div className="App pt-3">
        <Route exact path = "/" component={Login}/>
        <Route exact path = "/main" component={Main}/> 
    </div>
  );
}

export default App;
