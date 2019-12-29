import React from 'react';






class Charts extends React.Component {


    componentDidMount(){
        // setTimeout(this.fetchEntries,1100);
        // this.findChildren()
    }

  render() {
    return (
       <div className="col-md-6">
            {this.props.entries.map((entry,key)=>(
                <h3 key={key}>{entry.child_name}</h3>
            ))}
      </div>
    );
  }
}
export default Charts;
