/**
 * Created by pengyao on 16/6/13.
 */
'use strict'
import {expect} from "chai";
import request from '../test';

describe("topic",function (){
    it("list",async function () {
        const list = await request.get("/api/topic/list");
        console.log(list);
    })
})