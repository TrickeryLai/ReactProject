/**
 * Created by lzf on 2017/4/17.
 */

const begin_click = (current)=>{
    return {
        current,
        type:'BEGIN_CLICK'
    }
};

const stop_click = (current)=>{
    return {
        current,
        type:'STOP_CLICK',
    }
};

const reset_click = (current)=>{
    return {
        current,
        type:'RESET_CLICK',
    }
};

export default {begin_click , stop_click , reset_click};