import './App.css';
import ListTaskComponents from './componets/ListTaskComponents';
import Header from './componets/Header';
import Footer from './componets/Footer';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import CreateTaskComponent from './componets/CreateTaskComponent';
//import UpdateTaskComponent from './componets/UpdateTaskComponent';
import ViewTaskComponent from './componets/ViewTaskComponent';

function App() {
  return (
    <div>
      <Router>
          <Header />
          <div className="container">
            <Routes> 
              <Route path='/' exact element = {<ListTaskComponents/>}></Route>
              <Route path='/tasks' element = {<ListTaskComponents/>}></Route>
              <Route path='/add-task/:id' element = {<CreateTaskComponent/>}></Route>
              <Route path='/view-task/:id' element = {<ViewTaskComponent/>}></Route>
              {/*<Route path='/update-employee/:id' element = {<UpdateEmployeeComponent/>}></Route>*/}
            </Routes>
          </div>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
