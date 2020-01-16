import React from 'react';
import {connect} from 'react-redux';
import {changebuttonindex,fetchupdatedconvo,message_selected,updatebottype} from '../actions';
import Updation from './Updation'
class Conversation extends React.Component {
    
changeactive= async (key,id)=>{
    await this.props.changebuttonindex(key+1,id)
    await this.props.fetchupdatedconvo()
}
selecting_message= async(con)=>{

    let update_conv=con
    
    if(update_conv.sender==='chatbot'&&update_conv.type==='text_with_buttons')
        {
            await this.props.updatebottype('buttons')
        }
        else if (update_conv.sender==='chatbot'&&update_conv.type==='text')
        {
            
            await this.props.updatebottype('text')
        }
       await this.props.message_selected()
    await this.props.message_selected(con)
}
render(){
    if(!this.props)
    {
        return(<div>loading</div>)
    }
    
    if(this.props.conv.length===0)
    {
        return(<div>bot is empty</div>)
    }
    let convs=this.props.conv.map((con)=>{
        
        if(con.sender==="chatbot")
        {
            
            if(con.type==="text_with_buttons")
            {
               var button_message=con.payload.buttons.map((button,index) => {
                   if(button.active===true)
                   {
                    return (<button className="ui red button mini"  key={index}>{button.text}</button>)
                }
                else
                {
                    return (<button className="ui grey button mini"  value={index}  onClick={() => this.changeactive(index,con._id)}>{button.text}</button>)
                }
                });
                
                return(<div onDoubleClick={()=>this.selecting_message(con)} key={con._id} id={con._id} className="ui left aligned container segment" style={{backgroundColor:"#64f38c"}} ><div  className=" ui left aligned header"><p>{con.payload.subtitle}</p></div><br />{button_message}</div>)
            }
            else
            {
                return(<div onDoubleClick={()=>this.selecting_message(con)} className="ui left aligned  header segment" style={{backgroundColor:"#64f38c"}} key={con._id} >{con.payload.text}</div>)
            }
        }
        else 
        {            
            return(<div className=" ui right aligned  header segment" style={{backgroundColor:"#f79d00"}} onDoubleClick={()=>this.selecting_message(con)} key={con._id} >{con.payload.text}</div>)
        }
    })
    return  (
        <div>
    <div className="convo" style={{overflow:"scroll",height:"500px"}}>
        <div >{convs}</div>
    </div>
    <div><Updation  /></div>
    </div>
  );
  }
  }
  
var mapStateToProps =(state)=>{
    return{
        conv:Object.values(state.conv)
    };
}
  export default connect(mapStateToProps,{changebuttonindex,fetchupdatedconvo,message_selected,updatebottype})(Conversation);