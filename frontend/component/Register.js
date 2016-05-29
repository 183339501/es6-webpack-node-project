/**
 * Created by pengyao on 16/5/29.
 */
import React from "react";
import jQuery from "jquery";
import {register} from "../lib/client";
const mtStyle = {
    marginTop:20
}
export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleChange(name,e) {
        this.state[name] = e.target.value;
    }
    handleLogin(e) {
        var $btn = jQuery(e.target);
        $btn.button("loading");
        register(this.state.name,this.state.password,this.state.email,this.state.nickname)
            .then(ret=>{
                $btn.button("reset");
                alert("注册成功");
                location = '/login';
            })
            .catch(err=>{
                $btn.button("reset");
                alert(err);
            })
    }
    render(){
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">注册</div>
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="name" className="col-sm-2 control-label">用户名</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" placeholder="用户名" onChange={this.handleChange.bind(this,'name')}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="col-sm-2 control-label">密码</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" placeholder="密码" onChange={this.handleChange.bind(this,'password')}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="col-sm-2 control-label">邮箱</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" placeholder="邮箱" onChange={this.handleChange.bind(this,'email')}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname" className="col-sm-2 control-label">昵称</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="nickname" placeholder="昵称" onChange={this.handleChange.bind(this,'nickname')}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)}>注册</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
