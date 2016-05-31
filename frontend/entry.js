/**
 * Created by pengyao on 16/5/16.
 */
import "bootstrap-webpack";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory } from 'react-router'
import App from "./App"
import TopicDetail from "./component/TopicDetail";
import Login from "./component/Login";
import AddTopic from "./component/AddTopic";
import TopicUpdate from "./component/TopicUpdate";
import Register from "./component/Register";
import Profile from "./component/Profile";
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/topic/:id" component={TopicDetail}></Route>
            <Route path="/topic/:id/edit" component={TopicUpdate}></Route>
            <Route path="/add_topic" component={AddTopic}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/login" component={Login}></Route>
        </Route>
    </Router>
),document.getElementById("app"));