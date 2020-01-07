import React from 'react';
import {Redirect} from 'react-router-dom';

// let today =

class Form extends React.Component{
    constructor(props) {
    super(props)
    this.state = {
        entry_id:"",
        entry_date:"",
        user_id:"",
        child_name:"First Name of Child",
        journal_entry:"",
        behavior:10,
        behavior_desc:"",
        helpful:10,
        helpful_desc:"",
        respect:10,
        respect_desc:"",
        sleep:10,
        sleep_desc:"",
        regret:10,
        regret_desc:"",
        cancel:false,
        formType:""

    }
  }

  getDateAndUser = () => {
      this.setState({
          entry_date:`${(new Date().getMonth())+1}/${new Date().getDate()}/${new Date().getFullYear()}`,
          user_id:this.props.userId
      })

  }

  handleChange = (e) => {
    this.setState({[e.target.id] : e.target.value})
  }

  toggleCancel = ()=>{
      this.setState({
          cancel:!this.state.cancel
      })
  }

  radioChange = (item,value)=>{
      console.log(item + "->" + value);
      this.setState({
            [item]:value
      })


  }

  handleSubmit = (e) => {
      e.preventDefault()

      if (this.props.form === 'updateEntry'){
          this.props.handleUpdate(this.state)
          this.props.toggleformredirect();
      }else if(this.props.form === 'newEntry' || this.props.form === 'newChild'){
          this.props.handleCreate(this.state);
          this.props.toggleformredirect();
      }
    }

  populateFormRatings = (subject) => {
      const values = [1,2,3,4,5,6,7,8,9,10]
      return values.map((num,key)=>{
          return(
            <div className="form-check form-check-inline" key={key}>
                <input onChange={()=>this.radioChange(subject,num)} className="form-check-input" type="radio" name={`${subject}_options`} id={`${subject}_${num}`} value={num} checked={this.state[subject] === num ? "checked" : ""}/>
                <label className="form-check-label" htmlFor={`${subject}_${num}`}>{num}
                {num === 1 || num === 10 ? this.scaleDescription(subject,num): null}</label>
            </div>
          )
      })
  }

  scaleDescription = (subject,num) => {
      if(num === 1){
          switch(subject){
                case 'behavior':
                    return ' (poor)';
                case 'helpful':
                    return ' (no help)';
                case 'respect' :
                    return ' (respectless)'
                case 'sleep' :
                    return ' (awful night)';
                case 'regret':
                    return ' (regret it all)'


          }
      }else if(num === 10){
          switch(subject){
                case 'behavior':
                    return ' (amazing)';
                case 'helpful':
                    return ' (awesome)';
                case 'respect' :
                    return ' (great)'
                case 'sleep' :
                    return ' (solid sleep)';
                case 'regret':
                    return ' (less regrets today)'


          }
      }



  }

  populateFormForUpdate = (entry,form) => {

      if (form === 'updateEntry') {
          entry = entry[0];
          // console.log(entry);
          this.setState({
              entry_id:this.props.entry_id,
              entry_date:entry.entry_date,
              user_id:entry.user_id,
              child_name:entry.child_name,
              journal_entry:entry.journal_entry,
              behavior:entry.behavior,
              behavior_desc:entry.behavior_desc,
              helpful:entry.helpful,
              helpful_desc:entry.helpful_desc,
              respect:entry.respect,
              respect_desc:entry.respect_desc,
              sleep:entry.sleep,
              sleep_desc:entry.sleep_desc,
              regret:entry.regret,
              regret_desc:entry.regret_desc,
              formType:form
          })

      }else if(form === 'newEntry'){
          this.getDateAndUser()
          this.setState({
              child_name:this.props.name,
              formType:form
          })
      }else if(form === 'newChild'){
          this.setState({
              formType:form
          })
          this.getDateAndUser()
      }
  }



  componentDidMount(){

      this.populateFormForUpdate(this.props.entry, this.props.form);
      window.scrollTo(0,0)
  }



    render(){

        return(
            <div className="formContainer container my-5 p-4 d-flex flex-column align-items-center">
            {this.props.userId ? null : <Redirect to="/login"/>}
            {this.props.formRedirect ? <Redirect to="/"/> : null}
            {!this.state.cancel ? null: this.state.child_name === "First Name of Child" ? <Redirect to="/"/> : <Redirect to={`/journal-entries/${this.state.child_name}`}/>}
                <h3>{this.state.child_name}</h3>
                <h4>Today is {this.state.entry_date}</h4>
                <form onSubmit={this.handleSubmit}>
                    {this.state.formType === 'newChild' ?
                    <div className="form-group">
                        <label htmlFor="child_name"><h4>Child Name</h4></label>
                        <input type="text" className="form-control" id="child_name" onChange={this.handleChange} aria-describedby="childName" placeholder={this.state.child_name}/>
                    </div>
                    : null}
                    <div className="form-group">
                        <label htmlFor="journal_entry"><h4>Journal Entry</h4></label>
                        <textarea className="form-control" id="journal_entry" onChange={this.handleChange} rows="4" defaultValue={this.state.journal_entry}></textarea>
                    </div>
                    <h3>Rate your child's day:</h3>
                    <h4>Behavior</h4>
                    {this.populateFormRatings('behavior')}
                    <div className="form-group">
                        <label htmlFor="behavior_desc">Why did you give their behavior this rating?</label>
                        <textarea className="form-control" id="behavior_desc" onChange={this.handleChange} rows="3" defaultValue={this.state.behavior_desc}></textarea>
                    </div>

                    <h4>Helpful</h4>
                    {this.populateFormRatings('helpful')}
                    <div className="form-group">
                        <label htmlFor="helpful_desc">Why did you give their helpfulness this rating?</label>
                        <textarea className="form-control" id="helpful_desc" onChange={this.handleChange} rows="3" defaultValue={this.state.helpful_desc}></textarea>
                    </div>

                    <h4>Respect</h4>
                    {this.populateFormRatings('respect')}
                    <div className="form-group">
                        <label htmlFor="respect_desc">Why did you give their respect this rating?</label>
                        <textarea className="form-control" id="respect_desc" onChange={this.handleChange} rows="3" defaultValue={this.state.respect_desc}></textarea>
                    </div>

                    <h4>Effect On My Sleep</h4>
                    {this.populateFormRatings('sleep')}
                    <div className="form-group">
                        <label htmlFor="sleep_desc">Why did they affect your sleep in this way?</label>
                        <textarea className="form-control" id="sleep_desc" onChange={this.handleChange} rows="3" defaultValue={this.state.sleep_desc}></textarea>
                    </div>

                    <h4>Overall Feelings Toward This Kid In Particular</h4>
                    {this.populateFormRatings('regret')}
                    <div className="form-group">
                        <label htmlFor="regret_desc">Why do you regret your decsion to have kids? Maybe you don't, but you're not being honest with yourself.</label>
                        <textarea className="form-control" id="regret_desc" onChange={this.handleChange} rows="3" defaultValue={this.state.regret_desc}></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary mx-2">Submit</button>

                    <button type="button" className="btn btn-secondary mx-2" onClick={this.toggleCancel}>Cancel</button>

                </form>
            </div>
        )
    }

}

export default Form;
