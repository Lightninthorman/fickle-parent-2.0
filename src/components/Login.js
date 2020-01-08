import React from 'react';
import LoginModal from './LoginModal.js'
import logo from '../images/Logo.png';

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
        <div className="login container d-flex flex-column align-items-center min-vh-100">
            {this.state.view === 'login' ?
                <LoginModal view={this.state.view} handleView={this.handleView} />
            :
                this.state.view === 'signup' ?
                    <LoginModal view={this.state.view} handleView={this.handleView}/>
                :
                    <div className="loginMainContainer d-flex flex-column align-items-center w-100 ">
                        <div className="jumbotron w-75 mt-5 d-flex flex-column align-items-center text-center">
                            <img src={logo} className='w-50'/>
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
                        <div className="productHighlights w-75 d-flex flex-row flex-wrap justify-content-center">
                            <div className="highlights m-2 p-2">
                                <h3>Daily Journal</h3>
                                <p>Kids say and do the darndest things. Keep track of those precious moments with the Fickle Parent online journal. The hours are long, but the years fly by. Now you can remember the little things that are so easily forgotten.
                                </p>
                            </div>
                            <div className="highlights m-2 p-2">
                                <h3>Child Chart Tracker</h3>
                                <p>
                                Rate each child's day in five different categories. The Fickle Parent app will analayze the data and provide you with a variety of charts to determine the child's strengths and weakness related to your overall approval.
                                </p>
                            </div>
                            <div className="highlights m-2 p-2">
                                <h3>Got Siblings?</h3>
                                <p>
                                The ability to chart and compare siblings provides parents with a direct way to determine which child is the favorite. Parents no longer need to lie and say they love each child the same as they now have hard, cold data to back up their choice.
                                </p>
                            </div>
                            <div className="highlights m-2 p-2">
                                <h3>Send Updates</h3>
                                <p>
                                Parents can send emails to each child informing them of their current rank and lowest performing category to help encourage improvements in that area. Children love the daily reminders of their standings and use the emails as motivation to prove their worth to their parents.
                                </p>
                            </div>
                        </div>
                    </div>
            }




        </div>
    );
  }
}
export default Login;
