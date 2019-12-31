import React from 'react';
import {Bar,Line,Doughnut,Radar} from 'react-chartjs-2';



class ChildCharts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            overallAverage:0,
            chartTypeLine:true,
            chartOptions1:{
                scales: {
                    yAxes: [{
                        ticks: {
                            min:0,
                            max:10
                        }
                    }]
                }
            },
            radarChart:{
                labels:[],
                datasets:[]
            },
            overallLineChart:{
                labels:[],
                datasets:[]
            },
            behaviorChart:{
                labels:[],
                datasets:[]
            },
            helpfulChart:{
                labels:[],
                datasets:[]
            },
            respectChart:{
                labels:[],
                datasets:[]
            },
            sleepChart:{
                labels:[],
                datasets:[]
            },
            regretChart:{
                labels:[],
                datasets:[]
            }
        }
    }

    getChildData = (allData) => {
        const data = allData.find(kid =>{
            return kid.child === this.props.name
        })
        this.setState({
            data:data,
            behaviorChart:{
                labels:data.dates,
                datasets:[{
                    label:"Behavior",
                    data:data.behaviorData,
                    backgroundColor:'rgba(255, 99, 132, 0.6)',
                    borderColor:'rgb(255, 99, 132'
                }]
            },
            helpfulChart:{
                labels:data.dates,
                datasets:[{
                    label:"Helpful",
                    data:data.helpfulData,
                    backgroundColor:'rgba(54, 162, 235, 0.6)',
                    borderColor:'rgb(54, 162, 235'
                }]
            },
            respectChart:{
                labels:data.dates,
                datasets:[{
                    label:"Respect",
                    data:data.respectData,
                    backgroundColor:'rgba(255, 206, 86, 0.6)',
                    borderColor:'rgb(255, 206, 86'
                }]
            },
            sleepChart:{
                labels:data.dates,
                datasets:[{
                    label:"Sleep",
                    data:data.sleepData,
                    backgroundColor:'rgba(75, 192, 192, 0.6)',
                    borderColor:'rgb(75, 192, 192'
                }]
            },
            regretChart:{
                labels:data.dates,
                datasets:[{
                    label:"Regret",
                    data:data.regretData,
                    backgroundColor:'rgba(153, 102, 255, 0.6)',
                    borderColor:'rgb(153, 102, 255)'
                }]
            }
        })
        this.getAverages(data)
    }

    getAverages =(data) => {
        const behaviorAvg = (data.behaviorData.reduce((total,num)=>total+num,0))/data.behaviorData.length;
        const helpfulAvg = (data.helpfulData.reduce((total,num)=>total+num,0))/data.helpfulData.length;
        const respectAvg = (data.respectData.reduce((total,num)=>total+num,0))/data.respectData.length;
        const sleepAvg = (data.sleepData.reduce((total,num)=>total+num,0))/data.sleepData.length;
        const regretAvg = (data.regretData.reduce((total,num)=>total+num,0))/data.regretData.length;
        let red = Math.floor(Math.random()*256);
        let green = Math.floor(Math.random()*256);
        let blue = Math.floor(Math.random()*256);

        const overallAverage = ((behaviorAvg + helpfulAvg +respectAvg + sleepAvg + regretAvg)/5)*10;

        let overallLineData =[];
        for(let i = 0; i < data.dates.length; i++){
            let dailyAvg = (data.behaviorData[i] + data.helpfulData[i] + data.respectData[i] + data.sleepData[i] + data.regretData[i])/5;
            overallLineData.push(dailyAvg);
        }
        this.setState({
            overallAverage:overallAverage,
            radarChart:{
                labels:["Behavior","Helpful","Respect","Sleep","Regret"],
                datasets:[{
                    label:this.props.name,
                    data:[behaviorAvg,helpfulAvg,respectAvg,sleepAvg,regretAvg],
                    backgroundColor: `rgba(${red},${green},${blue},0.4)`,
                    borderColor:`rgb(${red},${green},${blue})`
                }]
            },
            overallLineChart:{
                labels:data.dates,
                datasets:[{
                    label:this.props.name,
                    data:overallLineData,
                    fill:true,
                    backgroundColor: `rgba(${red},${green},${blue},0.4)`,
                    borderColor:`rgb(${red},${green},${blue})`
                }]
            }
        })
    }

    changeChartType = () => {
        this.setState({
            chartTypeLine:!this.state.chartTypeLine
        })
    }

    componentDidMount(){
        this.getChildData(this.props.childData);
    }

  render() {
    return (
       <div className="col-md-6">

            <h3>Hi! You made it to {this.props.name}'s charts!</h3>
            <Line data = {this.state.overallLineChart} options = {this.state.chartOptions1}/>
            <Radar data ={this.state.radarChart} options = {this.state.chartOptions1} />
            <button onClick={this.changeChartType}>Change to {this.state.chartTypeLine ? 'bar' : 'line'} chart!</button>
            {this.state.chartTypeLine ?
                <Line data={this.state.behaviorChart}
                    options={this.state.chartOptions1}
                />
            :
                <Bar data={this.state.behaviorChart}
                    options={this.state.chartOptions1}
                />
            }

            {this.state.chartTypeLine ?
                <Line data={this.state.helpfulChart}
                    options={this.state.chartOptions1}
                />
            :
                <Bar data={this.state.helpfulChart}
                    options={this.state.chartOptions1}
                />
            }

            {this.state.chartTypeLine ?
                <Line data={this.state.respectChart}
                    options={this.state.chartOptions1}
                />
            :
                <Bar data={this.state.respectChart}
                    options={this.state.chartOptions1}
                />
            }

            {this.state.chartTypeLine ?
                <Line data={this.state.sleepChart}
                    options={this.state.chartOptions1}
                />
            :
                <Bar data={this.state.sleepChart}
                    options={this.state.chartOptions1}
                />
            }

            {this.state.chartTypeLine ?
                <Line data={this.state.regretChart}
                    options={this.state.chartOptions1}
                />
            :
                <Bar data={this.state.regretChart}
                    options={this.state.chartOptions1}
                />
            }

      </div>
    );
  }
}
export default ChildCharts;
