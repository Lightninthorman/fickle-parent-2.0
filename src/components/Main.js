import React from 'react';
import * as fire from 'firebase';

const baseUrl = "https://fickle-parent-backend.herokuapp.com/fickle-parent/";

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            entries:[]
        }
    }

    fetchEntries = () => {
        fetch(`${baseUrl}${this.props.user.uid}`)
        .then( data => data.json())
        .then(jData => {
            console.log(jData);
            this.setState({entries:jData})
        }).catch(err=>console.log(err))
    }

    logout = () => {
        fire.auth().signOut()
    }

    componentDidMount(){
        setTimeout(this.fetchEntries,1100);
    }

  render() {
    return (
       <div className="col-md-6">
            Welcome Home {this.props.user.displayName}
            <button onClick={this.logout}>Logout</button>
            {this.state.entries.map((entry,key)=>(
                <div key={key}>
                    <h3>{entry.child_name}</h3>
                    <h4>Journal Entry:</h4>
                    <p>{entry.journal_entry}</p>
                </div>
            ))}
      </div>
    );
  }
}
export default Main;
