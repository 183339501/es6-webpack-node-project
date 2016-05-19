/**
 * Created by pengyao on 16/5/19.
 */
import React from "react";
import "../stylesheet/style.css"

export default class Footer extends React.Component{
    render(){
        return (
            <footer className="bs-docs-footer" role="contentinfo">
                <div className="container">
                    <ul className="bs-docs-footer-links text-muted">
                        <li>当前版本： v0.0.1</li>
                        <li>·</li>
                        <li><a href="https://github.com/183339501">GitHub 仓库</a></li>
                        <li>·</li>
                        <li><a href="javascript:;">关于</a></li>
                        <li>·</li>
                        <li><a href="http://blog.getbootstrap.com">官方博客</a></li>
                        <li>·</li>
                        <li><a href="https://github.com/183339501/praticle-node-project/issues">Issues</a></li>
                        <li>·</li>
                    </ul>
                </div>
            </footer>
        )
    }
}