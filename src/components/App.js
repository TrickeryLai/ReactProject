'use strict';


import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import  store from './store';
import ajaxService from './modules/ajaxService';
import LayOut from '../views/LayOut/Lay';
import Home from '../views/Home/index';
import DiySearch from '../views/Marketing/DiySearch/index';
import ServicesSearch from '../views/Marketing/ServicesSearch/index';
import Tracking  from '../views/Marketing/Tracking';
import Calculate from '../views/Marketing/Tracking/Calculate';
import DoubleClick from '../views/Marketing/Tracking/DoubleClick';
import Zoom from '../views/Marketing/Tracking/Zoom';

import { Router, Route, hashHistory, IndexRoute,Redirect,IndexRedirect } from 'react-router';

//引入样式文件
import './../styles/main.css';
import './../styles/antd.css'
import './../styles/bootstrap.min.css';

//DatePicker、MonthPicker、RangePicker 部分 locale 是从 value 中读取，所以请先正确设置 moment 的 locale,全局设置moment
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');



//最终渲染
ReactDom.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={LayOut}>
                <IndexRoute component={Home}></IndexRoute>
                {/*营销*/}
                <Route path="/marketing">
                    <Route path="/marketing/search" component={DiySearch}/>
                    <Route path="/marketing/server" component={ServicesSearch}/>
                    <Route path="/marketing/tracking" component = {Tracking}>
                        {/*访问根目录的时候，自动跳转*/}
                        {/*页面内配置路由时候，自定义以"_"开头命名，为导航栏判定*/}
                        <IndexRedirect to="/marketing/tracking/_inside_Calculate"/>
                        <Route path="/marketing/tracking/_inside_Calculate" component={Calculate} />
                        <Route path="/marketing/tracking/_inside_DoubleClick" component={DoubleClick} />
                        <Route path="/marketing/tracking/_inside_Zoom" component={Zoom} />
                    </Route>
                </Route>
            </Route>
        </Router>
    </Provider>

), document.getElementById('app'));
