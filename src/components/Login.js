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
        <div className="login d-flex flex-column align-items-center min-vh-100">
            {this.state.view === 'login' ?
                <LoginModal view={this.state.view} handleView={this.handleView} />
            :
                this.state.view === 'signup' ?
                    <LoginModal view={this.state.view} handleView={this.handleView}/>
                :
                    <div className="loginMainContainer d-flex flex-column align-items-center w-100 ">
                        <div className="jumbotron w-75 mt-5 d-flex flex-column align-items-center">
                            <h1 className="display-4">The Fickle Parent</h1>
                            <p className="lead mb-0">Hey, they're your kids, we won't judge...</p>
                            <p className="lead mt-0">But now YOU can!</p>
                            <div className="my-4 d-flex flex-row justify-content-center">
                                <button type="button" onClick={()=>this.handleView('login')} className="btn btn-primary btn-lg mx-4" >
                                    Log In
                                </button>
                                <button type="button" onClick={()=>this.handleView('signup')} className="btn btn-success btn-lg mx-4" >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                        <div className="productHighlights">
                            <h1>Hello World!</h1>
                        </div>
                    </div>
            }




        </div>
    );
  }
}
export default Login;
