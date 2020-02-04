import React from 'react';
import {Link} from 'react-router-dom';



class JournalEntries extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayDetails:false,
            key:null,
            categories:['behavior','helpful','respect','sleep','regret']
        }
    }


    toggleDetailDisplay = (key) => {
        this.setState({
            displayDetails:!this.state.displayDetails,
            key:key
        })
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

  render() {
    return (
       <div className="container journalPageContainer mt-5 d-flex flex-column align-items-start">
            <h1>{this.props.name}</h1>
            <div className="d-flex flex-row justify-content-between w-100">
                <Link to={`/new-entry/${this.props.name}`} className="btn btn-success" onClick={this.props.toggleformredirect}>New Journal Entry</Link>
                <Link to='/'><button type="button" className="btn btn-outline-light" onClick={() => this.props.handleDelete(this.props.name)}>Remove Child</button></Link>
            </div>
            <div className="page d-flex flex-column align-items-start p-4 mt-3">
            {this.props.entries.map((entry,key)=>{
                if(entry.child_name === this.props.name){
                    return(<div key={key} className="entry mb-3 p-2">
                                <div className="d-flex flex-row justify-content-between ">
                                    <h3>{entry.entry_date}</h3>
                                    <Link className='btn btn-primary' to={`/update-entry/${entry.entry_id}`} onClick={this.props.toggleformredirect}>Update Entry</Link>
                                </div>
                            <h4>Journal Entry:</h4>
                            <p>{entry.journal_entry}</p>
                            <p onClick={()=>this.toggleDetailDisplay(key)}>
                            Details>>
                            </p>
                            {this.state.key === key && this.state.displayDetails ?
                                <div className="d-flex flex-row flex-wrap justify-content-start">
                                    {this.state.categories.map((category,key)=>{
                                        let description = category + "_desc"
                                        return(
                                            <div className="details m-1 p-1" key = {key}>
                                                <h4 className="m-0 p-0" style={{textTransform:"capitalize"}}>{category}</h4>
                                                <p className="m-0 p-0"><strong>Score:</strong></p>
                                                <p className="m-0 p-0">{entry[category]}</p>
                                                <p className="m-0 p-0"><strong>Notes:</strong></p>
                                                <p className="m-0 p-0">{entry[description]}</p>
                                            </div>
                                        )
                                    })}

                                </div>
                            :
                                null}
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
