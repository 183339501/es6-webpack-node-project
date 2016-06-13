/**
 * Created by pengyao on 16/6/13.
 */
'use strict'
import {expect} from "chai";
import request from '../test';

describe("user",function (){
    it("logout",async function () {
        const user = await request.get("/api/logout",{

        });
        console.log(user);
    })
})