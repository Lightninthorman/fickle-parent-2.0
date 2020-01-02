import React from 'react';
import * as fire from 'firebase';
import {Link, Redirect} from 'react-router-dom';
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
       <div className="journal container mt-5 d-flex flex-column align-items-center">
       <Link to="/new-child" className="addChildBtn btn btn-outline-dark my-5">Add Child</Link>

       {this.props.user ? null : <Redirect to="/login"/>}

            <div className="childJournalLinks d-flex flex-row flex-wrap justify-content-center">

                {this.props.children.map((child,key)=>(
                    <Link to={`/journal-entries/${child}`} key={key} className="childBtn btn btn-outline-dark mx-3 mb-3"> {child} </Link>
                ))}
            </div>


      </div>
    );
  }
}
export default Journal;
