/**
 * Created by pengyao on 16/5/19.
 */
import React from "react";
import {Link} from 'react-router';
export default class Header extends React.Component{
    render(){
        return (
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="javascript:;"><Link to="/">主页</Link></a></li>
                    <li><a href="#">用户中心</a></li>
                </ul>
            </div>
        )
    }
}