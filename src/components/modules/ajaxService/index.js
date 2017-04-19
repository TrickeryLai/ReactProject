
// ajax请求
import reqwest  from 'reqwest'
import {Mask} from './../Modal/mask';

let ajax={};
ajax.prototype={
    reqwestJson:function(data,url,successfunction){
       let mask=new Mask();
       mask.show();
        reqwest({
            url:url,
            method:'get',
            data:data,
            type:'json',
        }).then(data=>{
            setTimeout(()=>{
                successfunction(data);
                mask.hide();
            },1000);

        })
    }
};

let ajaxService=ajax.prototype;

export default ajaxService;