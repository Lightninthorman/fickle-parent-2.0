import React from 'react';
import * as fire from 'firebase';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import JournalEntries from './JournalEntries.js'



class Journal extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            child:'Isaac',
            view:'journal',
            children: []
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

    findChildren = () => {
        let children = [];
        let entries = this.props.entries;

        while (entries){
            if (children.includes(entries[0].child_name)){
                entries.shift();
            }else{
                children.push(entries[0].child_name);
                entries.shift();
            }
        }
        console.log(children);
    }

    componentDidMount(){
        // setTimeout(this.fetchEntries,1100);
        // this.findChildren()
    }

  render() {
    return (
       <div className="col-md-6">
            Welcome Home {this.props.user.displayName}
            <button onClick={this.logout}>Logout</button>
            <Link to={`/new-entry/${this.state.child}`}>Add Child</Link>
            <Router>
            {this.props.children.map((child,key)=>(
                <Link to={`/journal-entries/${child}`} key={key}> {child} </Link>
            ))}
                <Switch>
                    <Route exact path = "/journal-entries/:name" render ={(props)=>{
                        let name = props.location.pathname.replace('/journal-entries/','');
                        return(
                            <JournalEntries name={name} entries={this.props.entries}/>
                        )
                    }}/>
                </Switch>


            </Router>


      </div>
    );
  }
}
export default Journal;
