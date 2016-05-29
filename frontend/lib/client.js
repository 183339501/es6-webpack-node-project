/**
 * Created by pengyao on 16/5/17.
 */
import BrowserRequest from "browser-request";
const urlBase = "/api/";
export function request (method,path,data={}) {
    return new Promise((resolve,reject)=>{
        method = method.toUpperCase();
        const options = {
            method:method,
            url : `${urlBase}${path}`
        }
        if(method==="GET"||method==='HEAD') {
            options.qs = data;
        } else {
            options.form = data;
        }
        BrowserRequest(options,(err,res,body)=>{
            if(err) {
                reject(err);
            } else {
                let data;
                try{
                    data = JSON.parse(body.toString())
                }catch(err) {
                    return reject(new Error("parse JSON data error "+err.message));
                }
                if(data.error) {
                    reject(data.error);
                } else {
                    resolve(data.result);
                }
            }
        })
    })
}

//获取帖子列表
export function getTopicList (options) {
    return request("get","/topic/list",{});
}

//获取帖子详情
export function getTopicDetail(id){
    return request("get",`/topic/item/${id}`);
}

//用户登陆
export function login(name,password) {
    return request("post",'/login',{name,password});
}

//当前登陆信息
export function currentUser() {
    return request("post","/login_user");
}

//注销
export function logout(){
    return request("post","/logout");
}

//发表新帖
export function addTopic(title,tags,content) {
    return request("post","/topic/add",{title,tags,content})
}

//更新帖子
export function updateTopic(id,title,tags,content) {
    return request("post",`/topic/item/${id}`,{title,tags,content});
}