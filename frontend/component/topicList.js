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
        getTopicList({})
            .then(ret=>{
                this.setState({list:ret.list})
            })
            .catch(err=>console.log(err));
    }

    render(){
        const list = Array.isArray(this.state.list)?this.state.list:[];
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
            </div>
        )
    }
}