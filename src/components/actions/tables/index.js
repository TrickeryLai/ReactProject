/**
 * Created by lay on 2017/3/23.
 */

const init = (current,data)=>{
    return {
        type:'INIT',
        current
    }
};

const add=(current,data)=>{
    return {
        type:'ADD',
        current
    }
};

const del = (current,index)=>{
    return {
        type:'DELETE',
        current,
        index
    }
};

const revise = (current,index)=>{
    return {
        type:'REVISE',
        current,
        index
    }
};

export default {add,del,revise,init}