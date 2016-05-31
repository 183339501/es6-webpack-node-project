/**
 * Created by pengyao on 16/5/31.
 */
import React from "react";
import jQuery from "jquery";
import {currentUser,profile} from "../lib/client";
const mtStyle = {
    marginTop:20
}
export default class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        currentUser()
            .then(ret=> {
                this.setState(ret.user)
            })
            .catch(err=>console.log(err));
    }
    handleChange(name,e) {
        this.setState({[name] : e.target.value});
    }
    handleSave(e) {
        var $btn = jQuery(e.target);
        $btn.button("loading");
        profile(this.state.email,this.state.nickname,this.state.about)
            .then(ret=>{
                $btn.button("reset");
                alert("修改成功");
                location = "/profile";
            })
            .catch(err=>{
                $btn.button("reset");
                alert(err);
            })
    }
    render(){
        if(!this.state._id) {
            return (<div>正在加载……</div>)
        }
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">{this.state.name} 个人的信息</div>
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="email" className="col-sm-2 control-label">邮箱</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="email" placeholder="邮箱" onChange={this.handleChange.bind(this,'email')} value={this.state.email}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname" className="col-sm-2 control-label">昵称</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="nickname" placeholder="昵称" onChange={this.handleChange.bind(this,'nickname')} value={this.state.nickname}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="about" className="col-sm-2 control-label">个人简介</label>
                            <div className="col-sm-10">
                                <textarea  className="form-control" id="about" value={this.state.about} onChange={this.handleChange.bind(this,'about')}></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="button" className="btn btn-primary" onClick={this.handleSave.bind(this)}>保存</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}/**
 * Created by pengyao on 16/5/31.
 */
