/**
 * Created by pengyao on 16/5/29.
 */
import React from "react";
import jQuery from "jquery";
import MarkDownEditor from "./MarkDownEditor";

export default class TopicEditor extends React.Component{
    constructor(props) {
        super(props);
    }
    handleChange(name,e){
        this.setState({[name]:e.target.value});
    }
    handlePost(e){
        const $btn = jQuery(e.target);
        $btn.button('loading');
        this.props.onSave(this.state.content,()=>{
            $btn.button("reset");
        });
    }
    render(){
        return (
            <div className="panel panel-primary" style={{marginLeft:20,marginRight:20}}>
                <div className="panel-heading">{this.props.title}</div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <MarkDownEditor onChange={this.handleChange.bind(this,"content")} />
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.handlePost.bind(this)}>发表</button>
                    </form>
                </div>
            </div>
        )
    }
}