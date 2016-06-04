/**
 * Created by pengyao on 16/5/19.
 */
import React from "react";
import {Link} from 'react-router';
import {currentUser,logout,notificationCount} from "../lib/client";
export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        currentUser()
            .then(ret=> {
                this.setState({user: ret.user})
            })
            .catch(err=>console.log(err));
        notificationCount(false)
            .then(ret => {
                this.setState({count:ret.count});
            })
            .catch(err=>{
                console.log(err);
            })
    }
    handleLogout(e){
        logout()
            .then(ret=> location.reload())
            .catch(err=>console.log(err));
    }
    render(){
        return (
            <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">简单论坛系统</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><Link to="/">主页</Link> <span className="sr-only">(current)</span></li>
                        <li><Link to="/add_topic"><i className="glyphicon glyphicon-plus"></i>发帖</Link></li>
                    </ul>
                    {this.state.user?
                        (<ul className="nav navbar-nav navbar-right">
                            <li><Link to="/profile">个人中心</Link></li>
                            <li>
                                <Link to="/notification">消息
                                    {this.state.count>0?<span className="text-danger">[{this.state.count}未读]</span>:null}
                                </Link>
                            </li>
                            <li><a href="javascript:;"onClick={this.handleLogout.bind(this)}>注销[{this.state.user.nickname}]</a></li>
                        </ul>
                        ) :
                        (<ul className="nav navbar-nav navbar-right">
                            <li><Link to="/login">登录</Link></li>
                            <li><Link to="/register">注册</Link></li>
                        </ul>)}
                    </div>
                </div>

            </nav>
        )
    }
}