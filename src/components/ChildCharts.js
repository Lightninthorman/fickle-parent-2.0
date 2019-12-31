import React from 'react';
import {Bar,Line,Doughnut} from 'react-chartjs-2';



class ChildCharts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            behaviorAvg:0,
            helpfulAvg:0,
            respectAvg:0,
            sleepAvg:0,
            regretAvg:0,
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
            behaviorChart:{
                labels:[],
                datasets:[],
                backgroundColor:[]
            },
            helpfulChart:{
                labels:[],
                datasets:[],
                backgroundColor:[]
            },
            respectChart:{
                labels:[],
                datasets:[],
                backgroundColor:[]
            },
            sleepChart:{
                labels:[],
                datasets:[],
                backgroundColor:[]
            },
            regretChart:{
                labels:[],
                datasets:[],
                backgroundColor:[]
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

        this.setState({
            behaviorAvg:behaviorAvg,
            helpfulAvg:helpfulAvg,
            respectAvg:respectAvg,
            sleepAvg:sleepAvg,
            regretAvg:regretAvg,
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
