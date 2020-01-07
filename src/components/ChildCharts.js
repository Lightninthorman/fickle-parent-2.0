import React from 'react';
import {Bar,Line,Doughnut,Radar} from 'react-chartjs-2';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';



class ChildCharts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            overallAverage:0,
            lowestAvg:'',
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
            chartOptions2:{
                scale:{
                    ticks:{
                        min:0,
                        max:10
                    }
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

        let avgArray = [behaviorAvg,helpfulAvg,respectAvg,sleepAvg,regretAvg];
        let needsImprovement = "";

        switch(avgArray.indexOf(Math.min(...avgArray))){
            case 0:
            needsImprovement = "Behavior";
            break;
            case 1:
            needsImprovement = "Helpful";
            break;
            case 2:
            needsImprovement = "Respect";
            break;
            case 3:
            needsImprovement = "Sleep";
            break;
            case 4:
            needsImprovement = "Just a general attitude adjustment";
            break;
        }

        console.log(needsImprovement);

        let overallLineData =[];
        for(let i = 0; i < data.dates.length; i++){
            let dailyAvg = (data.behaviorData[i] + data.helpfulData[i] + data.respectData[i] + data.sleepData[i] + data.regretData[i])/5;
            overallLineData.push(dailyAvg);
        }
        this.setState({
            overallAverage:overallAverage,
            lowestAvg:needsImprovement,
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
        if(this.props.fetching){
            this.getChildData(this.props.childData);
        }else{
            console.log("childCharts redirect");
        }
        window.scrollTo(0,0);
    }



  render() {
    return (
       <div className="chartContainer container my-5 p-4 d-flex flex-column align-items-center">

            <h3>Hi! You made it to {this.props.name}'s charts!</h3>
            <Router>
                <Link to={`/email/${this.props.name}`} className="btn btn-primary">Send Email</Link>

                <Switch>
                <Route exact path = "/email/:name" render ={(props)=>{
                    let child = props.location.pathname.replace('/email/','');
                    return(
                        <ChildCharts
                            child={child}
                            email={this.props.email}
                            rank={this.props.rank}
                            score={this.state.overallAverage}
                            lowestAvg={this.state.lowestAvg}

                            />
                    )
                }}/>
                </Switch>
            </Router>

            <div className="childChartContainer2 d-flex flex-row flex-wrap justify-content-center">
            <div className="childAvgChart">
            <Line data = {this.state.overallLineChart} options = {this.state.chartOptions1}/>
            </div>
            <div className="childAvgChart">
            <Radar data ={this.state.radarChart} options = {this.state.chartOptions2} />
            </div>
            </div>
            <button onClick={this.changeChartType}>Change to {this.state.chartTypeLine ? 'bar' : 'line'} chart!</button>
            <div className="childChartContainer2 d-flex flex-row flex-wrap justify-content-center">
                <div className="childCharts m-2">
                    {this.state.chartTypeLine ?
                        <Line data={this.state.behaviorChart}
                            options={this.state.chartOptions1}
                        />
                    :
                        <Bar data={this.state.behaviorChart}
                            options={this.state.chartOptions1}
                        />
                    }
                </div>
                <div className="childCharts m-2">
                    {this.state.chartTypeLine ?
                        <Line data={this.state.helpfulChart}
                            options={this.state.chartOptions1}
                        />
                    :
                        <Bar data={this.state.helpfulChart}
                            options={this.state.chartOptions1}
                        />
                    }
                </div>
                <div className="childCharts m-2">
                    {this.state.chartTypeLine ?
                        <Line data={this.state.respectChart}
                            options={this.state.chartOptions1}
                        />
                    :
                        <Bar data={this.state.respectChart}
                            options={this.state.chartOptions1}
                        />
                    }
                </div>
                <div className="childCharts m-2">
                    {this.state.chartTypeLine ?
                        <Line data={this.state.sleepChart}
                            options={this.state.chartOptions1}
                        />
                    :
                        <Bar data={this.state.sleepChart}
                            options={this.state.chartOptions1}
                        />
                    }
                </div>
                <div className="childCharts m-2">
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
            </div>
      </div>
    );
  }
}
export default ChildCharts;
