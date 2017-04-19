/**
 * Created by lay on 2017/3/23.
 */

import {combineReducers} from 'redux';
import breadCrumb from './navChange';
import tablesReducer from './tablesReducer';
import calculate from './calculate';
import doubleClick from './doubleClick';

const todoApp=combineReducers({
    breadCrumb,
    tablesReducer,
    calculate,
    doubleClick,
});

export default todoApp;

