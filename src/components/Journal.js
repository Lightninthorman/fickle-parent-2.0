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



  render() {
    return (
       <div className="col-md-6">

       {this.props.user ? null : <Redirect to="/login"/>}
            Welcome Home {this.props.user.displayName}
            <button onClick={this.logout}>Logout</button>
            <Link to={`/new-child`} >Add Child</Link>

                <div>
                    {this.props.children.map((child,key)=>(
                        <Link to={`/journal-entries/${child}`} key={key}> {child} </Link>
                    ))}
                </div>
                <div>
                    <Link to= {"/charts"} onClick={()=>this.props.changeFetching(true)}>Charts</Link>
                </div>

      </div>
    );
  }
}
export default Journal;
