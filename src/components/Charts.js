import React from 'react';






class Charts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            AllData:[]
        }
    }

    getBehaviorData = () => {
        let newData = [];
        for(let i = 0; i < this.props.children.length; i++){
            let childBehaviorData = {
                child:this.props.children[i],
                behaviorData: [],
                helpfulData:[],
                respectData:[],
                sleepData:[],
                regretData:[]
            }
            for (let x = 0; x<this.props.entries.length; x++){
                if(this.props.entries[x].child_name === childBehaviorData.child){
                    childBehaviorData.behaviorData.push(this.props.entries[x].behavior);
                    childBehaviorData.helpfulData.push(this.props.entries[x].helpful);
                    childBehaviorData.respectData.push(this.props.entries[x].respect);
                    childBehaviorData.sleepData.push(this.props.entries[x].sleep);
                    childBehaviorData.regretData.push(this.props.entries[x].regret);
                }
            }
            newData.push(childBehaviorData);
        }
        console.log(newData);
        this.setState({
            AllData:newData
        })
    }

    componentDidMount(){
        // setTimeout(this.fetchEntries,1100);
        // this.findChildren()
        this.getBehaviorData()
    }

  render() {
    return (
       <div className="col-md-6">
            {this.state.AllData.map((entry,key)=>(
                <div key={key}>
                <h3 >{entry.child}</h3>
                <h4>Score</h4>
                <p>{entry.behaviorData}</p>
                </div>
            ))}
      </div>
    );
  }
}
export default Charts;
