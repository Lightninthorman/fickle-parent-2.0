import React from 'react';
import LoginModal from './LoginModal.js'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        view:'options',
    };
  }

  handleView = (view) => {
      this.setState({
          view:view
      })
  }



  render() {
    return (
        <div className="col-md-6">
            {this.state.view === 'login' ?
                <LoginModal view={this.state.view} handleView={this.handleView} />
            :
                this.state.view === 'signup' ?
                    <LoginModal view={this.state.view} handleView={this.handleView}/>
                :
                    <>
                        <button type="button" onClick={()=>this.handleView('login')} className="btn btn-primary" >
                            Log In
                        </button>
                        <button type="button" onClick={()=>this.handleView('signup')} className="btn btn-success" >
                            Sign Up
                        </button>
                    </>

            }




        </div>
    );
  }
}
export default Login;
