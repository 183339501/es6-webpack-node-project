/**
 * Created by pengyao on 16/5/19.
 */
import React from "react";
import {getTopicList} from "../lib/client";
import {Link} from 'react-router';
const mtStyle = {
    marginTop:20
}
export default class TopicList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount () {
        this.updateTopicList({page:this.props.location.query.page});
    }
    componentWillReceiveProps(nextProps) {
        this.updateTopicList({page:nextProps.location.query.page});
    }
    updateTopicList(query) {
        getTopicList(query)
            .then(ret=>{
                this.setState(ret);
            })
            .catch(err=>console.log(err));
    }

    render(){
        const list = Array.isArray(this.state.list)?this.state.list:[];
        var prevPage = this.state.page-1;
        if(prevPage<1) prevPage = 1;
        var nextPage = this.state.pageSize===this.state.page?this.state.page:this.state.page+1;
        return (
            <div style={mtStyle}>
                <ul className="list-group">
                    {list.map((item,i)=>{
                        return (
                            <li className="list-group-item" key={i}>
                                <Link to={`/topic/${item._id}`}>{item.title}</Link></li>
                        )
                    })}
                </ul>
                <nav>
                    <ul className="pager">
                        <li><Link to={`/?page=${prevPage}`}>上一页</Link></li>
                        <li><Link to={`/?page=${nextPage}`}>下一页</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}