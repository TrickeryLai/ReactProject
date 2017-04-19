/**
 * Created by lzf on 2017/4/17.
 */

const doubleClick = (state={time:0,best_grade:0},action)=>{
    switch (action.type){
        case 'BEGIN_CLICK':
            let time;
            time=action.current;
            return state=Object.assign({},state,time);
        case 'STOP_CLICK':
            let {best_grade}=state;
            if(best_grade==0){
                best_grade=action.current;
            }
            if(action.current<=best_grade){
                best_grade=action.current;
            }
            return state=Object.assign({},state,{best_grade});
        case 'RESET_CLICK':
            best_grade=action.current;
                return state=Object.assign({},state,{best_grade,time:best_grade});
        default:
            return state;
    }
};

export default doubleClick;