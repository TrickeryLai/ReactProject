/**
 * Created by lay on 2017/3/23.
 */

const breadCrumb=(state={breadCrumb:[]},action)=>{
    switch(action.type){
        case 'NAV_CHANGE':
            return{
                breadCrumb:action.breadCrumb
            };
        case 'NAV_INIT':
            return{
                breadCrumb:action.breadCrumb
            };
        default:
            return state;
    }
};

export default breadCrumb;