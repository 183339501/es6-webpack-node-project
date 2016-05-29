/**
 * Created by pengyao on 16/5/29.
 */
import React from "react";
import TopicEditor from "./TopicEditor"
import {getTopicDetail,updateTopic} from "../lib/client";
export default class AddTopic extends React.Component{
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
        if(!this.state.topic) {
            return (
                <h1>正在加载……</h1>
            )
        }
        return (
            <TopicEditor topic={this.state.topic} title={`修改 ${this.state.topic.title}`} onSave={(topic,done)=>{
            updateTopic(this.props.params.id,topic.title,topic.tags,topic.content)
                .then(ret=>{
                    done();
                    location = `/topic/${ret.topic._id}`
                })
                .catch(err=>{
                    done();
                    alert(err);
                })
            }}
            />
        )
    }
}