import history from '../history';
import base from '../apis/base'


export const cleanauth = () => async (dispatch, getState) => {
    const token=localStorage.getItem('token')
     await base.post('http://localhost:3001/users/logout','hello',
    {
        
        "headers": {'Authorization': "Bearer " + token}
    });
    await dispatch({ type: 'SIGN_OUT' })
    await dispatch({type:'DELETE_EACH_BOT',payload:[]})
    await dispatch({type:'BOT_TYPE',payload:"text"})
    await dispatch({type:'DELETE_WHOLE_CONVO',payload:[]})
    await dispatch({type:'UPDATE_BOT_NAME',payload:'no'})
    await dispatch({type:'SELECT_MESSAGE',payload:"none"})
    localStorage.removeItem("token")
     
};

export const signInUser = (formValues) => async (dispatch, getState) => {
    const response = await base.post('http://localhost:3001/user/login',
    {
        data:formValues
    });
     await  dispatch({ type: 'SIGN_IN', payload: response.data })
     localStorage.setItem("token",response.data.token)
     history.push('/bot-list')
     
};


export const link_to_create_user_action=()=>async (dispatch,getState)=>{
  
    history.push('/user/new')
};
 

export const create_user_action=(message)=>async (dispatch,getState)=>{
    const response= await base.post('http://localhost:3001/user',message,{
    });
    await dispatch({ type: 'SIGN_IN', payload: response.data })
    localStorage.setItem("token",response.data.token)
     history.push('/bot-list')
};


export const logout_user = () => async (dispatch, getState) => {   
   history.push('/')     
};

export const fetchBots=()=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
   const response= await base.get('http://localhost:3001/users/me',{
        headers: {'Authorization': "Bearer " + token}
    });
   await dispatch({type:'BOT_LIST',payload:response.data})
   await dispatch({type:'UPDATE_BOT_NAME',payload:'no'})
   history.push('/bot-list')
};

export const fetchupdatedbot=()=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
   const response= await base.get('http://localhost:3001/users/me',{
        headers: {'Authorization': "Bearer " + token}
    });
    if(response.status===201)
    {
        await dispatch({type:'DELETE_EACH_BOT',payload:[]})
    }
    else if(response.status===200)
    {
        
        await dispatch({type:'DELETE_EACH_BOT',payload:[]})
        await dispatch({type:'BOT_LIST',payload:response.data})
    }
   
   history.push('/bot/convo')
};

export const link_to_createbot=()=>async (dispatch,getState)=>{
  
   history.push('/bot/new')
};

export const create_bot=(message)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    await base.post('http://localhost:3001/user/me/bot',message,{
        "headers": {'Authorization': "Bearer " + token}
    });
   history.push('/bot-list')
};

export const fetchConvo=(id)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    
    localStorage.setItem("botid",id)
   const response= await base.get('http://localhost:3001/user/me/bot/'+id,{
        headers: {'Authorization': "Bearer " + token}
    });
    if(response.status===201)
    {
        history.push('bot/convo')
    }
    else if(response.status===200)
    {
        
        await dispatch({type:'CONVO_DISPLAY',payload:response.data})
        history.push('bot/convo')
    }
};

export const fetchupdatedconvo=()=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const id=localStorage.getItem('botid')
    const response= await base.get('http://localhost:3001/user/me/bot/'+id,{
        headers: {'Authorization': "Bearer " + token}
    });
    if(response.status===201)
    {
        
        await dispatch({type:'DELETE_WHOLE_CONVO',payload:[]})
    }
    else if(response.status===200)
    {
        
        await dispatch({type:'DELETE_WHOLE_CONVO',payload:[]})
        await dispatch({type:'CONVO_DISPLAY',payload:response.data})
    }
   
   history.push('/bot/convo')
};

export const bottype=(message_type)=>async (dispatch,getState)=>{
    if(message_type===undefined)
    {
        await dispatch({type:'BOT_TYPE',payload:"text"})
    }
    else
    {
        await dispatch({type:'BOT_TYPE',payload:message_type})
    }
};

export const create_message_in_end=(message)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const id=localStorage.getItem('botid')
    console.log('http://localhost:3001/user/me/bot/addtext/'+id)
    const response= await base.post('http://localhost:3001/user/me/bot/addtext/'+id,message,{
        "headers": {'Authorization': "Bearer " + token}
    });
   await dispatch({type:'CONVO_ADD',payload:response.data})
};

export const create_message_in_middle=(message,id)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const id_bot=localStorage.getItem('botid')
    await base.post('http://localhost:3001/user/me/bot/'+id_bot+'/conv/'+id,message,{
        "headers": {'Authorization': "Bearer " + token}
    });
};

export const changebuttonindex=(key,id)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const ID=localStorage.getItem('botid')
    const response= await base.get('/user/me/bot/'+ID+'/button/'+id+'/'+key,{
        headers: {'Authorization': "Bearer " + token}
    });
   await dispatch({type:'BUTTON_INDEX_CHANGE',payload:response.data})
    
};


export const message_selected=(con)=>async (dispatch,getState)=>{

    if(con===undefined)
    {
        await dispatch({type:'SELECT_MESSAGE',payload:"none"})
    }
    else
    {
        await dispatch({type:'SELECT_MESSAGE',payload:con})
    }
};


export const update_message=(message,id)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const botid=localStorage.getItem('botid')
    await base.patch('http://localhost:3001/user/me/bot/'+botid+'/conv/'+id,message,{
        "headers": {'Authorization': "Bearer " + token}
    });
};


export const updatebottype=(message_type)=>async (dispatch,getState)=>{
    await dispatch({type:'UPDATE_BOT_TYPE',payload:message_type})
};


export const delete_conv_message=(id)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const botid=localStorage.getItem('botid')
    await base.delete('http://localhost:3001/user/me/bot/'+botid+'/conv/'+id,{
        "headers": {'Authorization': "Bearer " + token}
    });
};


export const delete_bot_action=(id)=>async (dispatch,getState)=>{
    const token=localStorage.getItem('token')
    const response= await base.delete('http://localhost:3001/user/me/bot/'+id,{
        "headers": {'Authorization': "Bearer " + token}
    });
await dispatch({type:'DELETE_BOT',payload:response.data})
};

export const link_to_edit_bot_action=(id)=>async (dispatch,getState)=>{
    await dispatch({type:'UPDATE_BOT_NAME',payload:id})
    history.push('/bot/edit')
}

export const edit_bot_name_action=(message,id)=>async (dispatch,getState)=>{
    
    const token=localStorage.getItem('token')
    
    const response= await base.patch('http://localhost:3001/user/me/bot/'+id,message,{
        "headers": {'Authorization': "Bearer " + token}
    });
    dispatch({type:'EDIT_BOT',payload:response.data})
    history.push('/bot-list')
}

export const cancel_bot_action=(message,id)=>async (dispatch,getState)=>{  
    history.push('/bot-list')
}
