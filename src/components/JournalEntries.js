import React from 'react';
import {Link} from 'react-router-dom';



class JournalEntries extends React.Component {


    componentDidMount(){
        window.scrollTo(0,0);
    }

  render() {
    return (
       <div className="container mt-5 d-flex flex-column align-items-start">
            <Link to={`/new-entry/${this.props.name}`} className="btn btn-success" onClick={this.props.toggleformredirect}>New Journal Entry</Link>
            <div className="page d-flex flex-column align-items-start p-4 mt-3">
            {this.props.entries.map((entry,key)=>{
                if(entry.child_name === this.props.name){
                    return(<div key={key}>
                            <h3>{entry.child_name}</h3>
                            <h4>Journal Entry:</h4>
                            <p>{entry.journal_entry}</p>
                            <Link className='btn btn-primary' to={`/update-entry/${entry.entry_id}`} onClick={this.props.toggleformredirect}>Update Entry</Link>
                        </div>
                    )
                }

            })}
            </div>

      </div>
    );
  }
}
export default JournalEntries;
