import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import Login from './components/Login.js';
import Main from './components/Main.js';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:{}
        }
    }

    componentDidMount(){
        this.authListener();
    }

    componentDidUpdate(){
        console.log("updateState",this.state.user.displayName);
    }

    authListener = () =>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({
                    user:user
                })
            }else{
                this.setState({
                    user:""
                })
            }
        })
    }

    render(){
        return(
            <Router>
                {this.state.user ? <Redirect to="/"/> : <Redirect to="/login"/>}
                <Switch>
                    <Route exact path = "/login" component = {Login}/>
                    <Route exact path = "/" render={(props)=>(
                        <Main user={this.state.user.displayName}/>
                    )}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
