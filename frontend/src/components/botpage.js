import React from 'react';
import {connect} from 'react-redux';
import {bottype,fetchBots,create_message_in_end,create_message_in_middle,message_selected,fetchupdatedconvo} from '../actions';
import TextForm from './createbotmessagetext.js';
import ButtonForm from './createbotmessagebutton';
import UserTextForm from './createusermessagetext';
import Conversation from './Conversation'
import Logout from './logout'
class Convo extends React.Component {

componentDidMount= async ()=>{
  await this.props.bottype()
  await this.props.fetchupdatedconvo()
}
change_to_text=()=>{
  this.props.bottype("text")

}
change_to_buttons=()=>{
  this.props.bottype("buttons")
}
onSubmit=async (formvalues,id)=>{
  if(id==="none")
  {
    await this.props.create_message_in_end(formvalues);
  }
  else
  {
    await this.props.create_message_in_middle(formvalues,id)
    
    await this.props.fetchupdatedconvo()
    await this.props.message_selected()

  }
}
goback=async ()=>{
  await this.props.fetchBots()
}
botfunc()
{
  if(this.props.botstate.bot_type==="text")
  {
   return(<div id="chatbox">
   <button onClick={this.change_to_text}className="ui button red">Text Message</button>
   
     <button onClick={this.change_to_buttons} className="ui button">Carousel</button>
     
   <br/>
   <div id="text" style={{display:'block'}}>
   <TextForm onsubmit={this.onSubmit} />
   
   </div>
   
  
   
   <br/>
   
   </div>
    )
  }
  else if(this.props.botstate.bot_type==="buttons")
  {
    return(<div id="ui segment">
    <button onClick={this.change_to_text} className="ui button">Text Message</button>
    
      <button onClick={this.change_to_buttons} className="ui button active red">Carousel</button>
      
    <br/>
      <div id="buttons" style={{display:'block'}}>
        
   <ButtonForm onsubmit={this.onSubmit} />
   
   </div>
   </div>
    )
  }

}
userfunc()
{
  
   return(<div id="chatbox">
  
   <br/>
   <div  style={{display:'block'}}>
   <UserTextForm onsubmit={this.onSubmit} />
   
   </div>
   
  
   
   <br/>
   
   </div>
    )
  
}
render(){
    return  (
    <div className="convo ui container">
        
<div className="container">
  <div className="toppane">
  <h1>Chat Bot!</h1>
  <Logout />
  <button onClick={()=>{this.goback()}}>go back to bot list</button>
  </div>
  <div className="leftpane">
  <div className=" ui segment ">
   <h1>Bot Says:</h1>
   {this.botfunc()}
</div>
</div>
 
  
<div className="middlepane" >
<Conversation />
</div>
 
  <div className="rightpane">
  <div className=" ui segment ">
    <h1>user says</h1>
    {this.userfunc()}
    </div>
    </div>
</div>
        
    </div>
  );
  }
  }
  
const mapStateToProps =(state)=>{
    return{ 
        isSignedIn:state.auth.isSignedIn,
        conv:Object.values(state.conv),
        botstate:state.botstate
    };
}
export default connect(mapStateToProps,{bottype,create_message_in_end,create_message_in_middle,fetchupdatedconvo,message_selected,fetchBots})(Convo);



    // if(!this.props)
    // {
    //     return(<div>loading</div>)
    // }
    // const convs=this.props.conv.map((con)=>{
    //     if(con.type==="bot")
    //     {
    //         return(<div style={{float:'left'}}><p>{con.text}</p><hr style={{color:'red'}}></hr></div>)
    //     }
    //     else 
    //     {
            
    //         return(<div style={{textAlign:'right'}}><p>{con.text}</p><hr style={{color:'blue'}}></hr></div>)
        
    //     }
    // })