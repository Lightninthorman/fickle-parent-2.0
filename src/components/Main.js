import React from 'react';
import * as fire from 'firebase';

class Main extends React.Component {


    logout = () => {
        fire.auth().signOut()
    }

  render() {
    return (
       <div className="col-md-6">
            Welcome Home {this.props.user}
            <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
export default Main;
