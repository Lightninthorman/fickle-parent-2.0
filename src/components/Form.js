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
        behavior:"",
        behavior_desc:"",
        helpful:"",
        helpful_desc:"",
        respect:"",
        respect_desc:"",
        sleep:"",
        sleep_desc:"",
        regret:"",
        regret_desc:"",

    }
  }

  // handleChange = (e) => {
  //   this.setState({[e.target.id] : e.target.value})
  // }
  //
  // checkboxChange = ()=>{
  //
  // }
  //
  // handleSubmit = (e) => {
  //     e.preventDefault()
  //
  //   }


  componentDidMount(){

  }

    render(){
        return(
            <div>
            {this.props.displayName ? null : <Redirect to="/login"/>}
                <h3>{this.props.name}</h3>
            </div>
        )
    }

}


export default Form;
