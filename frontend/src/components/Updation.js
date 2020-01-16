import React from 'react'
import {connect} from 'react-redux'
import {fetchupdatedconvo,message_selected,update_message,updatebottype,delete_conv_message} from '../actions';
import Usertextform from './updateusermessagetext'
import Bottextform from './updatebotmessagetext'
import Botbuttonform from './updatebotmessagebutton'

class Updation extends React.Component {

    async componentDidMount()
    {
        var update_conv=this.props.Updation_State.conv_selected
        if(update_conv.sender==='chatbot'&&update_conv.type==='text_with_buttons')
        {
          await this.props.updatebottype('buttons')
        }
        else if (update_conv.sender==='chatbot'&&update_conv.type==='text')
        {
          await this.props.updatebottype('text')
        }
    }
    deletemessage=async (conv)=>{
        await this.props.delete_conv_message(conv._id)
        await this.props.fetchupdatedconvo()
        await this.props.message_selected()

    }
    cancelmessage()
    {
      this.props.message_selected()
    }
    onSubmit=async (formvalues)=>{
        await this.props.update_message(formvalues,this.props.Updation_State.conv_selected._id)
        await this.props.fetchupdatedconvo()
        this.props.message_selected()
      }
      change_to_text=async ()=>{
        await this.props.updatebottype("text")
      
      }
      change_to_buttons=async ()=>{
        await this.props.updatebottype("buttons")
      }
render()
{
var update_conv=this.props.Updation_State.conv_selected


if(update_conv==='none')
{
  return(<div className="ui segment header">no message selected</div>)
}
  
  let textval=update_conv.payload.text
  let buttonval=update_conv.payload.buttons
  let button_sub=update_conv.payload.subtitle
  if(textval===undefined)
    {
      textval=""
    }
    if(button_sub===undefined)
    {
      button_sub=""
    }
    
  if(update_conv.sender==='customer')
  {
    return (
    <div className="ui segment">
      
    <Usertextform initialValues={{text:textval}} onsubmit={this.onSubmit} />
    <div className="ui segment">
      <button className="ui button red"  onClick={()=>{this.deletemessage(update_conv)}}>delete</button>
      <button className="ui button red"  onClick={()=>{this.cancelmessage()}}>cancel</button>
    </div>
    </div>)
  }
  else if(update_conv.sender==='chatbot')
  {
    
    let  bot_type=this.props.update_bot_type
    if(bot_type==="text")
    {
      return(<div className="ui segment">
      <button className="ui button" onClick={this.change_to_text}>Text Message</button>
      <button className="ui button" onClick={this.change_to_buttons}>Carousel</button>
      <br/>
      <div id="text" style={{display:'block'}}>
      <Bottextform onsubmit={this.onSubmit} initialValues={{text:textval}} />
      <div className="ui segment">
        <button className="ui button red" onClick={()=>{this.deletemessage(update_conv)}}>delete</button>
        <button className="ui button red"  onClick={()=>{this.cancelmessage()}}>cancel</button>
      </div>
      </div>
      <br/>
      </div>
      )
    }
    else if(bot_type==="buttons")
    {
      if(buttonval.length===0)
      {
        return(<div className="ui segment">
        <button className="ui button" onClick={this.change_to_text}>Text Message</button>
        <button className="ui button" onClick={this.change_to_buttons}>Carousel</button>
        <br/>
        <div id="buttons" style={{display:'block'}}>
        <Botbuttonform onsubmit={this.onSubmit} initialValues={{subtitle:button_sub}} />
        <div className="ui segment">
          <button className="ui button red" onClick={()=>{this.deletemessage(update_conv)}}>delete</button>
          <button className="ui button red" onClick={()=>{this.cancelmessage()}}>cancel</button></div>
        </div>
        </div>
        )
      }
      else if(buttonval.length===1)
      {
        return(<div className="ui segment">
        <button className="ui button" onClick={this.change_to_text}>Text Message</button>
        <button className="ui button"  onClick={this.change_to_buttons}>Carousel</button>
        <br/>
        <div id="buttons" style={{display:'block'}}>
        <Botbuttonform onsubmit={this.onSubmit} initialValues={{subtitle:button_sub,button1:buttonval[0].text}} />
        <div className="ui segment">
          <button className="ui button red" onClick={()=>{this.deletemessage(update_conv)}}>delete</button>
          <button className="ui button red" onClick={()=>{this.cancelmessage()}}>cancel</button></div>
        </div>
        </div>
        )
      }
      else if(buttonval.length===2)
      {
        return(<div className="ui segment">
        <button className="ui button"  onClick={this.change_to_text}>Text Message</button>
        <button  className="ui button" onClick={this.change_to_buttons}>Carousel</button>
        <br/>
        <div id="buttons" style={{display:'block'}}>
        <Botbuttonform onsubmit={this.onSubmit} initialValues={{subtitle:button_sub,button1:buttonval[0].text,button2:buttonval[1].text}} />
        <div className="ui segment">
          <button className="ui button red" onClick={()=>{this.deletemessage(update_conv)}}>delete</button>
          <button className="ui button red" onClick={()=>{this.cancelmessage()}}>cancel</button></div>
        </div>
        </div>
        )
      }
      else if(buttonval.length===3)
      {
        return(<div className="ui segment">
        <button className="ui button"  onClick={this.change_to_text}>Text Message</button>
        <button  className="ui button" onClick={this.change_to_buttons}>Carousel</button>
        <br/>
        <div id="buttons" style={{display:'block'}}>
        <Botbuttonform onsubmit={this.onSubmit} initialValues={{subtitle:button_sub,button1:buttonval[0].text,button2:buttonval[1].text,button3:buttonval[2].text}} />
        <div className="ui segment" >
          <button className="ui button red" onClick={()=>{this.deletemessage(update_conv)}}>delete</button>
          <button className="ui button red" onClick={()=>{this.cancelmessage()}}>cancel</button></div>
        </div>
        </div>
        )
      }
    }
  }    
}

  }
  
  
var mapStateToProps =(state)=>{
    return{
        conv:Object.values(state.conv),
        Updation_State:state.message_selected,
        update_bot_type:state.updatetype.update_bot_type
    };
}
  export default connect(mapStateToProps,{update_message,fetchupdatedconvo,message_selected,updatebottype,delete_conv_message})(Updation);
//   <div style={{textAlign:'right'}}><p>{con.text}</p><hr style={{color:'blue'}}></hr></div>


// }
// render(){
//     // console.log(this.props)
//     if(!this.props)
//     {
//         return(<div>loading</div>)
//     }
    
//     if(this.props.conv.length===0)
//     {
//         return(<div>bot is empty</div>)
//     }
//     let convs=this.props.conv.map((con)=>{
        
//         if(con.type==="bot")
//         {
            
//             if(con.text==="null")
//             {
//                 // console.log(con.buttons)
//                 // console.log('yo')
//                var button_message=con.buttons.map((button,index) => {
//                 //    console.log(index)
//                    if(button.active===true)
//                    {
//                     return (<button className="ui button active red" style={{float:"left"}} key={index}>{button.text}</button>)
//                 }
//                 else
//                 {
//                     return (<button className="ui button" style={{float:"left"}} value={index}  onClick={() => this.changeactive(index,con._id)}>{button.text}</button>)
//                 }
//                 });
//                 // console.log(button_message)
//                 // return(<div className="blue_box" key={con._id}><span>{con.text}</span></div>)
                
//                 return(<div onDoubleClick={()=>this.updatecomponent(con)} key={con._id} id={con._id} className="ui container blue"  style={{float:"left"}}><span>{button_message}</span></div>)
//             }
//             else
//             {
//                 return(<div onDoubleClick={()=>this.updatecomponent(con)} className="blue_box" key={con._id} ><span><button className="ui button">{con.text}</button></span></div>)
//             }
//         }
//         else 
//         {
//             // console.log(con._id)
            
//             return(<div className="red_box" onDoubleClick={()=>this.updatecomponent(con)} key={con._id} ><span><button className="ui button">{con.text}</button></span></div>)
        
//         }
//     })
//     return  (
//         <div>
//     <div className="convo" style={{overflow:"scroll",height:"500px"}}>
//         <div >{convs}</div>
//     </div>
//     <div><Updation  /></div>
//     </div>
//   );
//   }