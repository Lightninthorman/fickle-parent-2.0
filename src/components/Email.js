import React from 'react';
import {Redirect} from 'react-router-dom';

// let today =

class Email extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user_email:"",
            child_email:"",
            child:"",
            rank:null,
            score:null,
            lowestAvg:"",
            user:"",
            cancel:false,
            emailSent:false
        }
    }

    addEmail = (e) => {
        this.setState({[e.target.id] : e.target.value})
    }

    toggleEmailSent = ()=>{
        this.setState({
            emailSent:!this.state.cancel
        })
    }

    toggleCancel = ()=>{
        this.setState({
            cancel:!this.state.cancel
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://fickle-parent-backend.herokuapp.com/fickle-parent/email",
        {
            body:JSON.stringify(this.state),
            method:'POST',
            headers:{
                'Accept': 'application/json, text/plain, */*', 'Content-Type':'applicaiont/json'
            }
        })
        .then(response => {
            this.toggleEmailSent();
        })
        .catch(err=>alert(err))
    }

    componentDidMount(){
        // console.log(this.props.name);
        this.setState({
            user_email:this.props.emailInfo.email,
            child:this.props.emailInfo.name,
            rank:this.props.emailInfo.rank,
            score:this.props.emailInfo.score,
            lowestAvg:this.props.emailInfo.lowestAvg,
            user:this.props.emailInfo.user
        })
    }

    render() {
      return (
         <div className="formContainer container my-5 p-4 d-flex flex-column align-items-center">
         {this.props.userId ? null : <Redirect to="/login"/>}
         {!this.state.cancel ? null: <Redirect to="/charts"/>}

         {this.state.emailSent ?
            <div className="emailBody d-flex flex-column align-items-center">
                <h3>Your email has been sent</h3>
                <button type="button" className="btn btn-success" onClick={this.toggleCancel}>Back to Charts</button>
            </div>
        :
            <>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="child_email">Please enter Email</label>
                    <input type="email" className="form-control" id="child_email" onChange={this.addEmail} aria-describedby="childEmail" required/>
                </div>
                <button type="submit" className="btn btn-primary mx-2">Submit</button>

                <button type="button" className="btn btn-secondary mx-2" onClick={this.toggleCancel}>Cancel</button>
            </form>
            <div className="emailBody">
                <p>Hi {this.state.child}!</p>
                <p>Currently you are my #{this.state.rank} child with a score of  <strong>{this.state.score}%</strong>.</p>
                {this.state.rank > 1 ?
                    <p>A great way to improve would be to work on {this.state.lowestAvg} </p>
                :
                    <p>Don't rest though, you could always work on  {this.state.lowestAvg} </p>
                }
                <p>Love,</p>
                <p>{this.state.user}</p>
                <p>** A copy of this email has been sent to Santa to help inform his list **</p>
            </div>
            </>
         }

        </div>
      );
    }
   }

export default Email;
