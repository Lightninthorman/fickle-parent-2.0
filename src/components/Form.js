import React from 'react';
import {Link, Redirect} from 'react-router-dom';

// let today =

class Form extends React.Component{
    constructor(props) {
    super(props)
    this.state = {

        entry_date:"",
        user_id:"",
        child_name:"",
        journal_entry:"",
        behavior:5,
        behavior_desc:"",
        helpful:10,
        helpful_desc:"",
        respect:10,
        respect_desc:"",
        sleep:10,
        sleep_desc:"",
        regret:10,
        regret_desc:""

    }
  }

  getDateAndUser = () => {
      this.setState({
          entry_date:`${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`,
          user_id:this.props.userId
      })

  }
  // handleChange = (e) => {
  //   this.setState({[e.target.id] : e.target.value})
  // }
  //
  radioChange = (item,value)=>{
      console.log(item + "->" + value);
      this.setState({
            [item]:value
      })


  }
  //
  // handleSubmit = (e) => {
  //     e.preventDefault()
  //
  //   }

  populateFormRatings = (subject) => {
      const values = [1,2,3,4,5,6,7,8,9,10]
      return values.map((num,key)=>{
          return(
            <div className="form-check form-check-inline" key={key}>
                <input onChange={()=>this.radioChange(subject,num)} className="form-check-input" type="radio" name={`${subject}_options`} id={`${subject}_${num}`} value={num} checked={this.state[subject] === num ? "checked" : ""}/>
                <label className="form-check-label" htmlFor={`${subject}_${num}`}>{num}</label>
            </div>
          )
      })
  }

  componentDidMount(){
      this.getDateAndUser()
  }

    render(){
        return(
            <div>
            {this.props.displayName ? null : <Redirect to="/login"/>}
                <h3>{this.props.name}</h3>
                <h4>Today is {this.state.entry_date}</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="child_name">Child Name</label>
                        <input type="text" className="form-control" id="child_name" aria-describedby="childName" placeholder="First Name of Child"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="journal_entry">Journal Entry</label>
                        <textarea className="form-control" id="journal_entry" rows="6" defaultValue="What a perfect child!"></textarea>
                    </div>
                    <h3>Rate your child's day:</h3>
                    <h4>Behavior</h4>
                    {this.populateFormRatings('behavior')}
                    <div className="form-group">
                        <label htmlFor="behavior_desc">Why did you give their behavior this rating?</label>
                        <textarea className="form-control" id="behavior_desc" rows="6" defaultValue="nothing to note"></textarea>
                    </div>

                    <h4>Helpful</h4>
                    {this.populateFormRatings('helpful')}
                    <div className="form-group">
                        <label htmlFor="helpful_desc">Why did you give their helpfulness this rating?</label>
                        <textarea className="form-control" id="helpful_desc" rows="6" defaultValue="nothing to note"></textarea>
                    </div>

                    <h4>Respect</h4>
                    {this.populateFormRatings('respect')}
                    <div className="form-group">
                        <label htmlFor="respect_desc">Why did you give their respect this rating?</label>
                        <textarea className="form-control" id="respect_desc" rows="6" defaultValue="nothing to note"></textarea>
                    </div>

                    <h4>Effect On My Sleep</h4>
                    {this.populateFormRatings('sleep')}
                    <div className="form-group">
                        <label htmlFor="sleep_desc">Why did they affect your sleep in this way?</label>
                        <textarea className="form-control" id="sleep_desc" rows="6" defaultValue="nothing to note"></textarea>
                    </div>

                    <h4>Overall Feelings Toward This Kid In Particular</h4>
                    {this.populateFormRatings('regret')}
                    <div className="form-group">
                        <label htmlFor="regret_desc">Why do you regret your decsion to have kids? Maybe you don't, but you're not being honest with yourself.</label>
                        <textarea className="form-control" id="regret_desc" rows="6" defaultValue="nothing to note"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

}

export default Form;
