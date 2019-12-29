import React from 'react';
import * as fire from 'firebase';
import {BrowserRouter as Router, Route, Switch,Link, Redirect} from 'react-router-dom';
import JournalEntries from './JournalEntries.js'
import Charts from './Charts.js'



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

    componentDidMount(){
        // setTimeout(this.fetchEntries,1100);
        // this.findChildren()
    }

  render() {
    return (
       <div className="col-md-6">
       {this.props.user ? null : <Redirect to="/login"/>}
            Welcome Home {this.props.user.displayName}
            <button onClick={this.logout}>Logout</button>
            <Link to={`/new-entry/${this.state.child}`}>Add Child</Link>
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
                    <Route exact path = "/charts" render={(props)=>(
                        <Charts entries= {this.props.entries}/>
                    )}/>
                </Switch>
            </Router>


      </div>
    );
  }
}
export default Journal;
