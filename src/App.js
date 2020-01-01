import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import Login from './components/Login.js';
import Journal from './components/Journal.js';
import Form from './components/Form.js';


const baseUrl = "https://fickle-parent-backend.herokuapp.com/fickle-parent/";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:{},
            entries:[],
            children:[]
        }
    }

    fetchEntries = () => {
        // console.log('fetch called');
        fetch(`${baseUrl}${this.state.user.uid}`)
        .then( data => data.json())
        .then(jData => {
            // console.log("data",jData[0]);

            this.setState({entries:jData})
            this.findChildren(jData);
        }).catch(err=>console.log(err))
    }

    handleCreate = (formData) => {
        fetch(`${baseUrl}`,{
            body:JSON.stringify(formData),
            method:'POST',
            headers:{
                'Accept': 'application/json, text/plain, */*', 'Content-Type':'applicaiont/json'
            }
        })
        .then(updatedEntries => {
            return updatedEntries.json()
            // console.log(updatedEntries);
        })
        .then(jsonnedEntries => {
            this.setState({entries:jsonnedEntries});
        })
        .catch(err=>console.log(err))


    }

    handleUpdate = (formData) => {
        // console.log(formData);
        // console.log(formData.entry_id);
        fetch(`${baseUrl}${formData.entry_id}`,{
            body:JSON.stringify(formData),
            method:'PUT',
            headers:{
                'Accept': 'application/json, text/plain, */*', 'Content-Type':'applicaiont/json'
            }
        })
        .then(updatedEntries => {
            return updatedEntries.json()
            // console.log(updatedEntries);
        })
        .then(jsonnedEntries => {
            this.setState({entries:jsonnedEntries});
        })
        .catch(err=>console.log(err))

    }


    findChildren = (data) => {

        let children = [];
        let entries = data;
        // console.log(children.includes(entries[0].child_name));
        // while (entries !== undefined){
        if (entries){
            for(let i = 0; i < entries.length; i++){
                if (!children.includes(entries[i].child_name)){

                    // console.log(entries[i].child_name + " was here");
                    children.push(entries[i].child_name);
                }
                // console.log(entries[i]);
            }
            // console.log(children);
        }
        this.setState({children:children})
    }

    componentDidMount(){
        this.authListener();
        // this.fetchEntries();

    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.user.displayName !== prevState.user.displayName){
            if(this.state.user.displayName){
                this.fetchEntries();
            }

        }
        // console.log("updateState",this.state.user.displayName);
    }

    authListener = () =>{

            firebase.auth().onAuthStateChanged((user)=>{
                // console.log("authchanged");
                if(user){
                    this.setState({
                        user:user
                    })
                }else{
                    this.setState({
                        user:"",
                        entries:[],
                        children:[]
                    })
                }
            })
            // setTimeout(this.fetchEntries,500);
    }

    render(){
        return(
            <Router>
                {this.state.user ? <Redirect to="/"/> : <Redirect to="/login"/>}
                <Switch>
                    <Route exact path = "/login" render = {(props) => (
                        <Login fetchEntries={this.fetchEntries} />
                    )}/>
                    <Route exact path = "/" render={(props)=>(
                        <Journal
                            user={this.state.user}
                            entries={this.state.entries}
                            children={this.state.children}
                            handleCreate={this.handleCreate}
                            handleUpdate={this.handleUpdate}
                        />
                    )}/>
                    <Route exact path = "/new-child" render ={(props)=>{

                        return(
                            <Form
                            displayName={this.state.user.displayName}
                            userId={this.state.user.uid}
                            form="newChild"
                            handleCreate={this.handleCreate}
                            />

                        )
                    }}/>



                </Switch>
            </Router>
        )
    }
}

export default App;
