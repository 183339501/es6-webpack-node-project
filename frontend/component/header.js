/**
 * Created by pengyao on 16/5/19.
 */
import React from "react";
import {Link} from 'react-router';
import {currentUser,logout} from "../lib/client";
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
                        <li><a href="#">帮助中心</a></li>
                    </ul>
                    {this.state.user?
                        (<ul className="nav navbar-nav navbar-right">
                            <li><a href="javascript:;"onClick={this.handleLogout.bind(this)}>注销[{this.state.user.nickname}]</a></li>
                        </ul>
                        ) :
                        (<ul className="nav navbar-nav navbar-right"><li><Link to="/login">登陆</Link></li>
                        <li><a href="#">注册</a></li></ul>)}
                    </div>
                </div>

            </nav>
        )
    }
}