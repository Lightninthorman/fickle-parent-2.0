import React from 'react';
import {Link} from 'react-router-dom';



class JournalEntries extends React.Component {


    // componentDidMount(){
    //     // setTimeout(this.fetchEntries,1100);
    //     // this.findChildren()
    // }

  render() {
    return (
       <div className="col-md-6">
            <Link to={`/new-entry/${this.props.name}`} className="btn btn-success" onClick={this.props.toggleFormRedirect}>New Journal Entry</Link>
            {this.props.entries.map((entry,key)=>{
                if(entry.child_name === this.props.name){
                    return(<div key={key}>
                            <h3>{entry.child_name}</h3>
                            <h4>Journal Entry:</h4>
                            <p>{entry.journal_entry}</p>
                            <Link className='btn btn-primary' to={`/update-entry/${entry.entry_id}`}>Update Entry</Link>
                        </div>
                    )
                }

            })}

      </div>
    );
  }
}
export default JournalEntries;
