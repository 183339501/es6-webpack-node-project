/**
 * Created by pengyao on 16/5/19.
 */
import React from "react";
import {getTopicDetail} from "../lib/client";
const mtStyle = {
    marginTop:20
}
export default class TopicDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount () {
        getTopicDetail(this.props.params.id)
            .then(ret=>{
                this.setState({topic:ret.topic})
            })
            .catch(err=>console.log(err));
    }

    render(){
        const topic = this.state.topic;
        if(!topic) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading"></div>
                    <div className="panel-body">
                        加载中……
                    </div>
                </div>
            )
        }
        return (
            <div className="panel panel-default" style={mtStyle}>
                <div className="panel-heading">{topic.title}</div>
                <div className="panel-body">
                    {topic.content}
                </div>
                <ul class="list-group">
                    {topic.comments.map((item,i)=>{
                        return (<li className="list-group-item" key={i}>
                            {item.authorId}于{item.createdAt}说：
                            <p>{item.content}</p>
                        </li>)
                    })}
                </ul>
            </div>

        )
    }
}