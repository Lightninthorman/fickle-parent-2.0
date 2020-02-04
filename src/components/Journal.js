import React from 'react';
import * as fire from 'firebase';
import {Link, Redirect} from 'react-router-dom';


class Journal extends React.Component {
    constructor(props){
        super(props);
        this.state ={

            children: [],
            childData:[]
        }
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
    window.scrollTo(0,0);
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
