import React from 'react';
import * as fire from 'firebase';
import {BrowserRouter as Router, Route, Switch,Link, Redirect} from 'react-router-dom';
import JournalEntries from './JournalEntries.js'
import Charts from './Charts.js'
import ChildCharts from './ChildCharts.js'
import Form from './Form.js';



class Journal extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            child:'Isaac',
            view:'journal',
            children: [],
            childData:[]
        }
    }

    handleView = (view) => {
        this.setState({
            view:view
        })
    }

    logout = () => {
        fire.auth().signOut()
    }

    getChildData = (data) => {
        this.setState({
            childData:data
        })
        console.log(data[0].child);
    }

    componentDidMount(){

    }

  render() {
    return (
       <div className="col-md-6">
       {this.props.user ? null : <Redirect to="/login"/>}
            Welcome Home {this.props.user.displayName}
            <button onClick={this.logout}>Logout</button>
            <Link to={`/new-child`}>Add Child</Link>
            <Router>
                <div>
                    {this.props.children.map((child,key)=>(
                        <Link to={`/journal-entries/${child}`} key={key}> {child} </Link>
                    ))}
                </div>
                <div>
                    <Link to= {"/charts"}>Charts</Link>
                </div>
                <Switch>
                    <Route exact path = "/journal-entries/:name" render ={(props)=>{
                        let name = props.location.pathname.replace('/journal-entries/','');
                        return(
                            <JournalEntries name={name} entries={this.props.entries}/>
                        )
                    }}/>
                    <Route exact path = "/new-entry/:name" render = {(props)=>{
                        let name = props.location.pathname.replace('/new-entry/','');
                        return(
                            <Form name={name} displayName={this.props.user.displayName} userId={this.props.user.uid} form="newEntry"/>
                        )
                    }} />
                    <Route exact path = "/update-entry/:id" render ={(props)=>{
                        let entry_id = props.location.pathname.replace('/update-entry/','');
                        let entry = this.props.entries.filter(entry=>{return entry.entry_id === parseInt(entry_id)})
                        return(
                            <Form
                                entry_id={entry_id}
                                displayName={this.props.user.displayName}
                                entry={entry}
                                userId={this.props.user.uid}
                                form="updateEntry"/>
                        )
                    }}/>
                    <Route exact path = "/charts" render={(props)=>(
                        <Charts
                        entries= {this.props.entries}
                        children={this.props.children}
                        getChildData={this.getChildData}
                        />
                    )}/>

                    <Route exact path = "/charts/:name" render ={(props)=>{
                        let name = props.location.pathname.replace('/charts/','');
                        return(
                            <ChildCharts name={name} children={this.state.children} childData={this.state.childData}/>
                        )
                    }}/>

                </Switch>
            </Router>


      </div>
    );
  }
}
export default Journal;
