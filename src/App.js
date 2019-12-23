import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import Login from './components/Login.js';
import Main from './components/Main.js'

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
        console.log("updateState",this.state.user);
    }

    authListener = () =>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({
                    user:user
                })
            }else{
                this.setState({
                    user:null
                })
            }
        })
    }

    render(){
        return(
            <div className="App">
                {this.state.user ? <Main user={this.state.user.displayName}/> : <Login />}
            </div>
        )
    }
}

export default App;
