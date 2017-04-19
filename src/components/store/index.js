/**
 * Created by lay on 2017/3/22.
 */

import {createStore} from 'redux';
import todoApp from './../reducers';

let store=createStore(
    todoApp
);

export default store;