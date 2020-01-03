import React from 'react';
import {Link} from 'react-router-dom';



class JournalEntries extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayDetails:false,
            key:null
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
            <Link to={`/new-entry/${this.props.name}`} className="btn btn-success" onClick={this.props.toggleformredirect}>New Journal Entry</Link>
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
                                    <div className="details m-1 p-1">
                                        <h4 className="m-0 p-0">Behavior</h4>
                                        <p className="m-0 p-0"><strong>Score:</strong></p>
                                        <p className="m-0 p-0">{entry.behavior}</p>
                                        <p className="m-0 p-0"><strong>Notes:</strong></p>
                                        <p className="m-0 p-0">{entry.behavior_desc}</p>
                                    </div>
                                    <div className="details m-1 p-1">
                                        <h4 className="m-0 p-0">Helpful</h4>
                                        <p className="m-0 p-0"><strong>Score:</strong></p>
                                        <p className="m-0 p-0">{entry.helpful}</p>
                                        <p className="m-0 p-0"><strong>Notes:</strong></p>
                                        <p className="m-0 p-0">{entry.helpful_desc}</p>
                                    </div>
                                    <div className="details m-1 p-1">
                                        <h4 className="m-0 p-0">Respect</h4>
                                        <p className="m-0 p-0"><strong>Score:</strong></p>
                                        <p className="m-0 p-0">{entry.respect}</p>
                                        <p className="m-0 p-0"><strong>Notes:</strong></p>
                                        <p className="m-0 p-0">{entry.respect_desc}</p>
                                    </div>
                                    <div className="details m-1 p-1">
                                        <h4 className="m-0 p-0">Sleep</h4>
                                        <p className="m-0 p-0"><strong>Score:</strong></p>
                                        <p className="m-0 p-0">{entry.sleep}</p>
                                        <p className="m-0 p-0"><strong>Notes:</strong></p>
                                        <p className="m-0 p-0">{entry.sleep_desc}</p>
                                    </div>
                                    <div className="details m-1 p-1">
                                        <h4 className="m-0 p-0">Regret</h4>
                                        <p className="m-0 p-0"><strong>Score:</strong></p>
                                        <p className="m-0 p-0">{entry.regret}</p>
                                        <p className="m-0 p-0"><strong>Notes:</strong></p>
                                        <p className="m-0 p-0">{entry.regret_desc}</p>
                                    </div>
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
