import React from 'react';
import {Line,Doughnut} from 'react-chartjs-2';
import {Link, Redirect} from 'react-router-dom';



let lineDataCompareAll = {
    labels:[],
    datasets:[]
}

let average = 0


class Charts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allData:[]
        }
    }

    getOverallAverage = (data) => {
        let behaviorAvg = (data.behaviorData.reduce((total,num)=>total+num,0))/data.behaviorData.length
        let helpfulAvg = (data.helpfulData.reduce((total,num)=>total+num,0))/data.helpfulData.length
        let respectAvg = (data.respectData.reduce((total,num)=>total+num,0))/data.respectData.length
        let sleepAvg = (data.sleepData.reduce((total,num)=>total+num,0))/data.sleepData.length
        let regretAvg = (data.regretData.reduce((total,num)=>total+num,0))/data.regretData.length

        const overallAverage = ((behaviorAvg + helpfulAvg +respectAvg + sleepAvg + regretAvg)/5)*10

        const gaugeChartData ={
            labels:["Current %","Potential"],
            datasets:[{
                label:data.child,
                data:[overallAverage, (100-overallAverage)],
                backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)"
                ]
            }]
        }
        average = overallAverage.toFixed(1);
        return  gaugeChartData

    }

    getLineData = (data) => {
        let lineLabels = data[0].dates;
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
        console.log("called");
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
        for(let y = 0; y<newData.length; y++){
            this.getOverallAverage(newData[y])
        }

        this.props.getChildData(newData)

    }

    componentDidMount(){
        // setTimeout(this.fetchEntries,1100);
        // this.findChildren()
        if(this.props.fetching){
            this.getAllData()
        }else{
            console.log("hi");
        }
    }

  render() {
    return (
        <div className="col-md-6">
            <div>
                {this.props.children.map((child,key)=>(
                    <Link key={key} to={`/charts/${child}`}> {child} Chart</Link>
                ))}

            </div>
            {this.state.allData.map((entry,key)=>(
            <Link key={key} to={`/charts/${entry.child}`} onClick={()=>this.props.changeFetching(true)}>
            <div>
            <h3 >{entry.child}</h3>
            <Doughnut data = {this.getOverallAverage(entry)} options = {{
                circumference: Math.PI,
                rotation : Math.PI,
                cutoutPercentage : 55,
                legend:{
                    display:false
                }
                    }}
            />
            <h3>{average}%</h3>
            </div>
            </Link>))}
        <Line
            data={lineDataCompareAll} options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            min:0,
                            max:10
                        }
                    }]
                }
            }}

        />
      </div>
    );
  }
}
export default Charts;
