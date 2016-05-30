/**
 * Created by pengyao on 16/5/19.
 */
import React from "react";
import {Link} from 'react-router';
import 'highlight.js/styles/github-gist.css';
import {getTopicDetail,addComment,deleteComment} from "../lib/client";
import {markdownParse} from "../lib/utils";
import CommentEditor from "./CommentEditor"
const mtStyle = {
    marginTop:20
}
export default class TopicDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount () {
        this.refresh();
    }
    refresh(){
        getTopicDetail(this.props.params.id)
            .then(ret=>{
                ret.topic.html = markdownParse(ret.topic.content);
                this.setState({topic:ret.topic})
            })
            .catch(err=>console.log(err));
    }
    handleDelete(cid) {
        if (!confirm("确认删除吗？")) return;
        deleteComment(this.props.params.id,cid)
            .then(ret=>{
                this.refresh();
            })
            .catch(err=>{
                alert(err);
            })
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
                <div className="panel-heading">{topic.title}
                <div className="pull-right"><Link to={`/topic/${topic._id}/edit`}><i className="glyphicon glyphicon-edit"></i>编辑</Link></div>
                </div>
                <p>{topic.author.nickname}发表于{topic.createdAt}</p>
                <div className="panel-body" dangerouslySetInnerHTML={{__html: topic.html}}>

                </div>
                <h6>
                    <i className='glyphicon glyphicon-tags' style={{marginLeft:10,marginRight:20}}></i>
                    {topic.tags.map((item,i) =>{
                       return (<span className="label label-default" key={i}>{item}</span>)
                    })}
                </h6>
                <CommentEditor title="发表评论" onSave={(content,done)=>{
                    addComment(this.props.params.id,content)
                        .then(ret=>{
                            done();
                            this.refresh()
                        }).catch(err=>{
                            alert(err);
                            done();
                        })
                }}/>
                <ul class="list-group">
                    {topic.comments.map((item,i)=>{
                        return (<li className="list-group-item" key={i}>
                            {item.author.nickname}于{item.createdAt}说：
                            <span className="pull-right"><button className="btn btn-xs btn-danger" onClick={this.handleDelete.bind(this,item._id)}><i className="glyphicon glyphicon-trash"></i></button></span>
                            <p dangerouslySetInnerHTML={{__html: markdownParse(item.content)}}></p>
                        </li>)
                    })}
                </ul>
            </div>

        )
    }
}