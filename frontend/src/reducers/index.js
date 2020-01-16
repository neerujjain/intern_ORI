import {combineReducers} from 'redux';
import signInReducer from './signInReducer';
import {reducer as formReducer} from 'redux-form';
import botReducer from './botReducer';
import convReducer from'./convReducer';
import botmess_reducer from'./botmess_reducer';
import updation_reducer from'./updation_reducer';
import updatebotmessreducer from './updatebotmessreducer'
import updatebotreducer from './updatebotreducer'
export default combineReducers({
    auth:signInReducer,
    form:formReducer,
    bots:botReducer,
    conv:convReducer,
    botstate:botmess_reducer,
    message_selected:updation_reducer,
    updatetype:updatebotmessreducer,
    updation_of_bot:updatebotreducer
});