import {FC} from 'react';
import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/Main";

import "./App.css";


const App: FC = () => {
  return (
    <div className="App">
        <Routes>
            <Route path={"/"} element={<MainPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
