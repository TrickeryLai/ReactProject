/**
 * Created by lzf on 2017/4/17.
 */

const calculate_init = (current)=>{
    return {
        current,type:'CALCULATE_INIT'
    }
};

const calculate_type = (current)=>{
    return current
};

const calculate_add = (current)=>{
    return {
        current,
        type:'CALCULATE_ADD'
    }
};

const calculate_reduce =(current)=>{
    return {
       current,
        type:'CALCULATE_REDUCE'
    }
};

const calculate_multiplication = (current)=>{
    return {
        current,
        type:'CALCULATE_MULTIPLICATION'
    }
};

const calculate_division = (current)=>{
    return{
        current,
        type:'CALCULATE_DIVISION'
    }
};

export default {calculate_add , calculate_reduce ,calculate_multiplication , calculate_division , calculate_type , calculate_init};