/**
 * Created by lzf on 2017/4/17.
 */

const calculate = (state=0,action)=>{
    switch (action.type){
        case 'CALCULATE_INIT':
            return state=action.current | 0;
        case 'CALCULATE_ADD':
            state= parseFloat(action.val1)+parseFloat(action.val2);
            return state;
        case 'CALCULATE_REDUCE':
            state= action.val1-action.val2;
            return state;
        case 'CALCULATE_MULTIPLICATION':
            state = action.val1*action.val2;
            return state;
        case 'CALCULATE_DIVISION':
            state = action.val1/action.val2;
            return state;
        default:
            return state
    }
};

export default calculate;