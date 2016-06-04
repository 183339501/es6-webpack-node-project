/**
 * Created by pengyao on 16/6/04.
 */
import React from "react";
import {Link} from 'react-router';
import jQuery from "jquery";
import {setRead,notificationList} from "../lib/client";
const mtStyle = {
    marginTop:20
}
export default class Notification extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.refresh();
    }
    refresh(){
        notificationList()
            .then(ret=> {
                this.setState({list:ret.list})
            })
            .catch(err=>console.log(err));
    }
    handleSetRead(id,e) {
        var $btn = jQuery(e.target);
        $btn.button("loading");
        setRead(id)
            .then(ret=>{
                $btn.button("reset");
                this.refresh();
            })
            .catch(err=>{
                $btn.button("reset");
                alert(err);
            })
    }
    render(){
        if(!Array.isArray(this.state.list)) {
            return (<div>正在加载……</div>)
        }
        const list = this.state.list.map(item=>{
            const ret = {};
            if(item.type === 'topic_comment'){
                ret.link = `/topic/${item.data._id}`;
                ret.title = `${item.from.nickname}于${item.createdAt}评论了你发表的主题《${item.data.title}》`
            } else {
                ret.link = null;
                ret.title="系统消息"
            }
            ret._id = item._id;
            ret.isRead = item.isRead;
            ret.createdAt = item.createdAt;
            return ret;
        });
        return (
            <ul className="list-group">
                {list.map((item,i)=>{
                    return (
                        <li className="list-group-item" key={i}>
                            <Link to={item.link}>{item.title}</Link>
                            {!item.isRead?<span className="pull-right">
                                <button className="btn btn-xs btn-success" onClick={this.handleSetRead.bind(this, item._id)}>
                                    <i className="glyphicon glyphicon-ok"></i> 设置为已读
                                </button>
                            </span>:null}
                        </li>
                    )
                })}
            </ul>
        )
    }
}
