import React from 'react';
import {NavLink} from 'react-router-dom';



class Navbar extends React.Component {


    // componentDidMount(){
    //     // setTimeout(this.fetchEntries,1100);
    //     // this.findChildren()
    // }

  render() {
    return (
        <div className="navbar container-fluid d-flex flex-row justify-content-center">
       <div className="conatiner d-flex flex-row justify-content-between w-75">
            <p>The Fickle Parent</p>
            <NavLink to="/" className="navLinks">Journal</NavLink>
            <NavLink to="/charts" onClick={()=>this.props.changeFetching(true)} className="navLinks">Charts</NavLink>
            <div className="d-flex flex-column align-items-center">
                <p className="m-0">Welcome Home {this.props.displayName}</p>
                <button onClick={this.props.logout} className="logout btn  btn-outline-dark btn-sm">Logout</button>
            </div>
      </div>
      </div>
    );
  }
}
export default Navbar;
