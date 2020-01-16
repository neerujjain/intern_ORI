import React from 'react';
import {connect} from 'react-redux';
import {fetchBots,fetchConvo,message_selected,link_to_createbot,delete_bot_action,link_to_edit_bot_action} from '../actions';
import Logout from './logout'
// ,link_to_edit_bot_action
// import Convo from './Convo';
// update_state
class BotList extends React.Component{
    componentDidMount(){
        this.props.fetchBots()
        this.props.message_selected()
    }
    link_to_createbot()
    {
        this.props.link_to_createbot()
    }
    renderAdmin(stream){
        if(stream.userId===this.props.currentUserId){
            return (
                <div className="ui right floated content">
                        <link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        delete
                    </link>
                </div>
                )
        }
    }
    Convo(id)
    {
      this.props.fetchConvo(id)  ;
    }
    delete_bot(id)
    {
        if (window.confirm('Are you sure you wish to delete this item?'))
        {        
            this.props.delete_bot_action(id)
        }
    }
    edit_bot_name(id,name)
    {
        let message=
        {
            "id":id,
            "bot_name":name
        }
        this.props.link_to_edit_bot_action(message)
    }
    renderList(){
        if(this.props.bots.length===0)
        {
            return(<div>empty</div>)
        }

        return this.props.bots.map(bot=>{
            return (
                
                <div className="item" key={bot._id}>
                    
                    {/* {this.renderAdmin(stream)} */}
                    <i className="large middle aligned icon camera" />
                    <div className="content"  >
                    {/* <link to={`/streams/edit/${bot._id}`} className="ui button primary">{bot.bot_name}</link> */}
                        <div >
                            <button onClick={()=>{this.Convo(bot._id)}}>{bot.bot_name}</button>
                            <button style={{ float:'right' }} onClick={()=>{this.delete_bot(bot._id)}}>delete</button> 
                            <button style={{ float:'right' }} onClick={()=>{this.edit_bot_name(bot._id,bot.bot_name)}}>edit</button>
                        </div>
                        
                        {/* <div className="description">{stream.description}</div> */}
                    </div>
                </div>
            )
        })
    }

    renderCreate=()=>{
        if(this.props.isSignedIn)
        {
            return (
            <div style={{ textAlign:'right' }}>
                <button onClick={()=>{this.link_to_createbot()}} className="ui primary button">
                    create bot
                </button>
            </div>
            )
        }
    }

   
    render(){
        
        return(
            <div>
            <h2>bots</h2><Logout />
            <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreate()}
            </div>
        )
    } 
    
}
const mapStateToProps =(state)=>{
    return{
        botIds: Object.values(state.auth.user.field_bots),
        isSignedIn:state.auth.isSignedIn,
        bots:Object.values(state.bots)
    };
}
export default connect(mapStateToProps,{fetchBots,fetchConvo,message_selected,link_to_createbot,delete_bot_action,link_to_edit_bot_action})(BotList);


// ,link_to_edit_bot_action