import React from 'react'
import {connect } from 'react-redux'
import {logout_user} from '../actions'

class Logout extends React.Component{

    logout_action()
    {
        this.props.logout_user()
    }

    render()
    {
        return(<div><button onClick={()=>{this.logout_action()}}>logout</button></div>)
    }
}
export default connect (null,{logout_user})(Logout)