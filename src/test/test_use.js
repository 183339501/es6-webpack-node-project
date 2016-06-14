/**
 * Created by pengyao on 16/6/13.
 */
'use strict'
import {expect} from "chai";
import request from '../test';

describe("user",function (){
    it("signup",async function () {
        try {
            const ret = await request.post('/api/signup', {
                name: 'test1',
                password: '123456789',
            });
            throw new Error('should throws missing parameter "email" error');
        } catch (err) {
            expect(err.message).to.equal('email: missing parameter "email"');
        }

        {
            const ret = await request.post('/api/signup', {
                name: 'test1',
                password: '123456789',
                email: 'test1@example.com'
            });
            console.log(ret);
            //expect(ret.user.name).to.equal('test1');
            //expect(ret.user.email).to.equal('test1@example.com');
        }
    });
})