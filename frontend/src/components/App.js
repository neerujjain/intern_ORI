import React from'react';
import { Router,Route } from 'react-router-dom';
// import base from '../apis/base';
// import axios from 'axios';
import SignIn from './SignIn';
import BotList from './BotList'
import History from '../history';
import convo from './botpage'
import createbot from './createbot'
import editbot_name from './editbot_name'
import createuser from './createuser'
// import Success from './Success';
class App extends React.Component {
    success(){
        return(<div>hi</div>)
     }
render(){
    return (<div className="ui container">
           
    <Router history={History}>
    <div>
    <Route path="/" exact component={SignIn} />
    <Route path="/success" exact component={this.success} />
    <Route path="/bot-list" exact component={BotList} />
    <Route path="/bot/convo" exact component={convo} />
    <Route path="/bot/new" exact component={createbot} />
    <Route path="/bot/edit" exact component={editbot_name} />
    <Route path="/user/new" exact component={createuser} />
    
    </div>
    </Router>
</div>)
}
}


export default App;
