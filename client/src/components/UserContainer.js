import React from "react";



class UserContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        };
    }
  
    render() {
      let user = this.props.email;
        return (
           <div>
            <div>User Logged In: </div>
            {user}
           </div>
        )
    };
  }

  export default UserContainer;