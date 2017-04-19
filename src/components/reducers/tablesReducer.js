/**
 * Created by lay on 2017/3/23.
 */

const tablesReducer = (state=[],action)=>{
    switch (action.type){
        case 'INIT':
             state=[...action.current];
             return state;
        case 'ADD':
            action.current.key=state.length+2;//table数据赋值key属性，唯一
            return state=[...state,action.current];
        case 'DELETE':
            return state=[...state.slice(0,action.index),...state.slice(action.index+1)];
        case 'REVISE':
            let newObj={};//创建新的空对象
            action.current.key=state[action.index].key;
            Object.assign(newObj,state[action.index],action.current);//将修改前的对象和修改后的对象进行合并，只对修改后的对象存在的对象进行合并，不能修改的属性保留；
            return state=[...state.slice(0,action.index),newObj,...state.slice(action.index+1)];
        default :
            return state;
    }
};

export default tablesReducer;