import React from 'react';
import {Bar,Line,Polar} from 'react-chartjs-2';



let lineDataCompareAll = {
    labels:[],
    datasets:[]
}
let options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}


// {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//   datasets: [{
//       label: "Stock A",
//       data: [65, 59, 80, 81, 56, 55, 40, ,60,55,30,78],
//       spanGaps: true,
//     }, {
//       label: "Stock B",
//       data: [10, 20, 60, 95, 64, 78, 90,,70,40,70,89],
//       spanGaps: false,
//     }
//
//   ]
// };



class Charts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allData:[]
        }
    }

    getLineData = (data) => {
        let lineLabels = data[data.length-1].dates;
        let lineDatasets = [];
        for (let i=0; i < data.length; i++){
            let red = Math.floor(Math.random()*256);
            let green = Math.floor(Math.random()*256);
            let blue = Math.floor(Math.random()*256)
            let childData = {
                label:"",
                data:[],
                fill:true,
                backgroundColor: `rgba(${red},${green},${blue},0.4)`,
                borderColor:`rgb(${red},${green},${blue})`

            };
            childData.label = data[i].child;
                for(let x = 0; x < data[i].dates.length; x++){
                    let dailyAvg = (data[i].behaviorData[x] + data[i].helpfulData[x] + data[i].respectData[x] + data[i].sleepData[x] + data[i].regretData[x])/ 5
                    childData.data.push(dailyAvg)
                }
                lineDatasets.push(childData);
            }
            lineDataCompareAll = {
                labels:lineLabels,
                datasets:lineDatasets

            }
        }



    getAllData = () => {
        let newData = [];
        for(let i = 0; i < this.props.children.length; i++){
            let childBehaviorData = {
                child:this.props.children[i],
                dates:[],
                behaviorData: [],
                helpfulData:[],
                respectData:[],
                sleepData:[],
                regretData:[]
            }
            for (let x = 0; x<this.props.entries.length; x++){
                if(this.props.entries[x].child_name === childBehaviorData.child){
                    childBehaviorData.dates.push(this.props.entries[x].entry_date);
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
            allData:newData
        })
        this.getLineData(newData)
    }

    componentDidMount(){
        // setTimeout(this.fetchEntries,1100);
        // this.findChildren()
        this.getAllData()
    }

  render() {
    return (
       <div className="col-md-6">
            {
            //     {this.state.AllData.map((entry,key)=>(
            //     <div key={key}>
            //     <h3 >{entry.child}</h3>
            //     <h4>Score</h4>
            //     <p>{entry.behaviorData}</p>
            //     </div>
            // ))}

        }
        <Line
            data={lineDataCompareAll} options={options}

        />


      </div>
    );
  }
}
export default Charts;
