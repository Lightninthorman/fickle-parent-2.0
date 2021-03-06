import React from 'react';
import {Line,Doughnut} from 'react-chartjs-2';
import {Link} from 'react-router-dom';


//**Testing to see how useful setting variables outside of object can be. After setting it up I have found that it is not as good as other options.
let lineDataCompareAll = {
    labels:[],
    datasets:[]
}

let average = 0

let rankings=[]


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
                "rgb(34, 179, 57)",
                "rgb(255, 99, 132)",
                "rgb(255, 205, 86)"
                ]
            }]
        }
        average = overallAverage.toFixed(1);
        let rankInfo = {
            child:data.child,
            average:average
        }

        let childExists = rankings.some(kid=>kid.child === data.child);
        if(!childExists){
            rankings.push(rankInfo);
        }
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
                borderColor:`rgb(${red},${green},${blue})`,
                spanGaps:true

            };

            childData.label = data[i].child;
                for(let x = 0; x < data[i].dates.length; x++){
                    let dailyAvg = (data[i].behaviorData[x] + data[i].helpfulData[x] + data[i].respectData[x] + data[i].sleepData[x] + data[i].regretData[x])/ 5
                    childData.data.push(dailyAvg)
                }
                while(lineLabels.length !== childData.data.length){
                    childData.data.unshift("")
                }
                lineDatasets.push(childData);
            }
            lineDataCompareAll = {
                labels:lineLabels,
                datasets:lineDatasets

            }
        }



    getAllData = () => {
        // console.log("called");
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
        // console.log(newData);

        this.setState({
            allData:newData
        })
        this.getLineData(newData)
        for(let y = 0; y<newData.length; y++){
            this.getOverallAverage(newData[y])
        }

        this.props.getChildData(newData);


    }

    componentDidMount(){
        if(this.props.fetching){
            this.getAllData();
            this.props.getRankings(rankings);
        }else{
            console.log("Nothing to report");
        }
        window.scrollTo(0,0);
    }

  render() {
    return (
        <div className="chartContainer container my-5 p-4 d-flex flex-column align-items-center">
            <div className="d-flex flex-row flex-wrap justify-content-center">
                {this.state.allData.map((entry,key)=>(
                <Link key={key} to={`/charts/${entry.child}`} onClick={()=>this.props.changeFetching(true)}>
                    <div className="chartAvgs m-3">
                        <h3 className="m-0">{entry.child}</h3>
                        <p className="chartChildLink m-0">(click for details)</p>
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
            </div>
            <div className="lineChart w-75">
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
      </div>
    );
  }
}
export default Charts;
