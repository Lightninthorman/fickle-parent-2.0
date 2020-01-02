import React from 'react';
import * as fire from 'firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName:'',
      error:''
    };
  }

  handleChange = (e)=> {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user)=>{
        // console.log(user)
        this.setState({
            error:'',
            userName: user.user.displayName
        });
        // console.log(this.state.userName);
    }).catch((error) => {
        this.setState({
            error:error.message
        })
      });
  }

  signup = (e) =>{
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
        // console.log('user',user);
        if(user){
            let updateUser = fire.auth().currentUser
            updateUser.updateProfile({
                error:'',
                displayName: this.state.userName
            })
        }
    })
    .catch((error) => {
        this.setState({
            error:error.message
        });
      })
  }
  render() {
    return (
        <div className="col-md-6">
            <form>
                {this.props.view === 'signup'?
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input value={this.state.userName} onChange={this.handleChange} type="text" name="userName" className="form-control" id="userName" aria-describedby="userName" required placeholder="Enter Username" />
                    </div>
                : null}
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" required placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="password" required placeholder="Password" />
                </div>
                {this.props.view === 'login'?
                <button type="submit" onClick={this.login} className="btn btn-primary">Login</button> :
                <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
            }
                <button onClick={()=>this.props.handleView('options')}>Cancel</button>


            </form>
            {this.state.error ? <div className="alert alert-danger">{this.state.error} </div> : null}

        </div>
    );
  }
}
export default Login;
