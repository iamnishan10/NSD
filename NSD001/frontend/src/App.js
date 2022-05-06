import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LoginPage from "./pages/User/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/index";
import AddUserPage from "./pages/User/AddUserPage";
import EditUserPage from "./pages/User/EditUserPage";
import RegisterPage from "./pages/User/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import FileUploadPage from "./pages/User/FileUploadPage";
import AudioRecordingPage from "./pages/Recording/AudioRecordingPage";

class App extends Component {
       

    render() {
        return (
            
            <div className="App">
                
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={LoginPage} />
                        <Route path='/dashboard' component={DashboardPage} />
                        <Route path='/index' component={IndexPage}/>
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/add' component={AddUserPage} />
                        <Route path='/edit/' component={EditUserPage} />
                        <Route path='/fileupload/' component={FileUploadPage} />
                        <Route path='/record/' component={AudioRecordingPage} />
                        <Route path='*' component={NotFoundPage} />
                    </Switch>
                </Router>
            </div>
            
        );
    }
}

export default App;
