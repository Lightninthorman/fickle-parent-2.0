import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import Login from './components/Login.js';
import Journal from './components/Journal.js';
import JournalEntries from './components/JournalEntries.js'
import Charts from './components/Charts.js'
import ChildCharts from './components/ChildCharts.js'
import Navbar from './components/Navbar.js'
import Email from './components/Email.js'
import Form from './components/Form.js';


const baseUrl = "https://fickle-parent-backend.herokuapp.com/fickle-parent/";

class App extends React.Component{
    fetching = false;
    constructor(props){
        super(props);
        this.state={
            user:{},
            entries:[],
            children:[],
            formRedirect:false,
            childData:[],
            ranking:[],
            emailInfo:{}
        }
    }

    fetchEntries = () => {
        // console.log('fetch called');
        fetch(`${baseUrl}${this.state.user.uid}`)
        .then( data => data.json())
        .then(jData => {
            this.setState({entries:jData})
            this.findChildren(jData);
        }).catch(err=>console.log(err))
    }

    handleCreate = (formData) => {
        fetch(`${baseUrl}/create`,{
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
            this.findChildren(jsonnedEntries);
            return "next"
        }).then(next =>{
            this.toggleformredirect()
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
            this.findChildren(jsonnedEntries);
            return "next"
        }).then(next =>{
            this.toggleformredirect()
        })
        .catch(err=>console.log(err))

    }

    handleDelete = (name) => {
        fetch(`${baseUrl}${this.state.user.uid}/${name}`,{
            method:'DELETE',
            headers:{
                'Accept': 'application/json, text/plain, */*', 'Content-Type':'applicaiont/json'
            }
        })
        .then(returnedEntries => {
            return returnedEntries.json()
        })
        .then(jsonnedEntries => {
            this.setState({entries:jsonnedEntries});
            this.findChildren(jsonnedEntries);
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

    toggleformredirect = () => {
        this.setState({
            formRedirect:!this.state.formRedirect
        })
    }

    handleView = (view) => {
        this.setState({
            view:view
        })
    }

    logout = () => {
        firebase.auth().signOut()
    }

    getChildData = (data) => {
        this.setState({
            childData:data
        })
        // console.log('get data calle',data);
    }

    getRankings = (childAndRank) =>{
        let sortedRank = childAndRank.sort((a,b)=>{return b.average-a.average});
        // console.log(sortedRank);
        this.setState({
            ranking:sortedRank
        })
    }

    emailInfo = (info) => {
        let rank = (this.state.ranking.findIndex(child => child.child === info.name))+1
        // console.log(rank);
        const email = {
            name:info.name,
            user:this.state.user.displayName,
            email:this.state.user.email,
            rank:rank,
            score:info.overallAverage,
            lowestAvg:info.lowestAvg
        }

        this.setState({
            emailInfo:email
        });
    }

    changeFetching = (bool) => {
        this.fetching = bool
    }

    componentDidMount(){
        this.authListener();
        // this.fetchEntries();

    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.user.uid !== prevState.user.uid){
            if(this.state.user.uid){
                this.fetchEntries();
            }

        }
        window.scrollTo(0,0);
        // console.log("updateState",this.state.user.displayName);
    }

    authListener = () =>{

            firebase.auth().onAuthStateChanged((user)=>{

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
            {this.state.user?
                <Navbar
                logout={this.logout} displayName={this.state.user.displayName}
                changeFetching={this.changeFetching}/>
                : null
            }
                <div className="main min-vh-100 m-0">

                    <Switch>
                        <Route exact path = "/login" render = {(props) => (
                            <Login fetchEntries={this.fetchEntries} />
                        )}/>
                        <Route exact path = "/" render={(props)=>(
                            <Journal
                                user={this.state.user}
                                entries={this.state.entries}
                                children={this.state.children}
                                formRedirect={this.state.formRedirect}
                            />
                        )}/>

                        <Route exact path = "/journal-entries/:name" render ={(props)=>{
                            let name = props.location.pathname.replace('/journal-entries/','');
                            return(
                                <JournalEntries
                                name={name} entries={this.state.entries}
                                changeFetching={this.changeFetching}
                                handleDelete={this.handleDelete}
                                />
                            )
                        }}/>
                        <Route exact path = "/new-child" render ={(props)=>{

                            return(
                                <Form
                                userId={this.state.user.uid}
                                form="newChild"
                                handleCreate={this.handleCreate}
                                formRedirect={this.state.formRedirect}
                                toggleformredirect={this.toggleformredirect}
                                />
                            )
                        }}/>
                        <Route exact path = "/new-entry/:name" render = {(props)=>{
                            let name = props.location.pathname.replace('/new-entry/','');
                            return(
                                <Form
                                name={name}
                                userId={this.state.user.uid}
                                form="newEntry"
                                handleCreate={this.handleCreate}
                                formRedirect={this.state.formRedirect}
                                toggleformredirect={this.toggleformredirect}
                                />
                            )
                        }} />
                        <Route exact path = "/update-entry/:id" render ={(props)=>{
                            let entry_id = props.location.pathname.replace('/update-entry/','');
                            let entry = this.state.entries.filter(entry=>{return entry.entry_id === parseInt(entry_id)})
                            return(
                                <Form
                                    entry_id={entry_id}
                                    entry={entry}
                                    userId={this.state.user.uid}
                                    form="updateEntry"
                                    handleUpdate={this.handleUpdate}
                                    formRedirect={this.state.formRedirect}
                                    toggleformredirect={this.toggleformredirect}
                                    />
                            )
                        }}/>
                        <Route exact path = "/charts" render={(props)=>(
                            <Charts
                            entries= {this.state.entries}
                            children={this.state.children}
                            getChildData={this.getChildData}
                            fetching={this.fetching}
                            changeFetching={this.changeFetching}
                            getRankings={this.getRankings}
                            />
                        )}/>

                        <Route exact path = "/charts/:name" render ={(props)=>{
                            let name = props.location.pathname.replace('/charts/','');
                            return(
                                <ChildCharts
                                    name={name}
                                    children={this.state.children}
                                    childData={this.state.childData}
                                    fetching={this.fetching}
                                    emailInfo={this.emailInfo}

                                    />
                            )
                        }}/>
                        <Route exact path = "/email/:name" render ={(props)=>{
                            return(
                                <Email
                                    emailInfo={this.state.emailInfo}
                                    userId={this.state.user.uid}
                                />
                            )
                        }}/>


                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
