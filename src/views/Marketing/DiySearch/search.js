/**
 * Created by lay on 2017/3/24.
 */

import React from 'react';
import {DatePicker, Form,Select,Input,Button,Icon} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;//时间组件
const FormItem = Form.Item;
const Options = Select.Option;

const dataFormat =  'YYYY-MM-DD';//定义时间格式

const selectData=[
    {name:'物业',value:"物业"},
    {name:'地产',value:"地产"},
    {name:'商业',value:"商业"},
];

class Search extends React.Component{
    constructor(props){
        const today=new Date();
        const startDay=new Date();
        startDay.setMonth(today.getMonth()-3);//设置当前时间前三个月为开始时间，也可以'2015-01-01'格式直接设置
        super(props);
        this.state={
            date:[startDay,today],
            selectValue:'物业',
            inputValue:null
        };
        this.handleTimeChange=this.handleTimeChange.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
    }
    handleTimeChange(date){
        // date数据类型自动生成对象组成的数组形式，对象的'_d'属性为时间
        this.setState({date})
    }
    handleSelectChange(selectValue){
        this.setState({selectValue})
    }
    handleInputChange(e){
        let input=e.target;
        let inputValue=input.value.trim();//此处的input值去除了数值前的空格
        this.setState({inputValue})
    }
    //添加
    handleAdd(){
        this.props.handleAdd();
    }
    //搜索
    handleSearch(){
        this.props.handleSearch(this.state);
    }
    render(){
        return (
            <div className="">
                <ul className="clear form">
                    <li className="form-li-long ">
                        <span className="form-span-long">时间：</span>
                        <div className="form-div-long">
                            <RangePicker
                            size="large"
                            style={{width:"100%"}}
                            defaultValue={[moment(this.state.date[0],dataFormat),moment(this.state.date[1],dataFormat)]}
                            format={dataFormat}
                            onChange={this.handleTimeChange}
                        />
                        </div>
                    </li>
                    <li className="form-li">
                        <span className="form-span">类型：</span>
                        <div className="form-div">
                            <Select
                            defaultValue={this.state.selectValue}
                            size="large"
                            style={{width:"100%"}}
                            onChange={this.handleSelectChange}
                        >
                            {selectData.map((item,index)=>{
                                return <Options value={item.value} key={index}>{item.name}</Options>
                            })}
                            </Select>
                        </div>
                    </li>
                    <li className="form-li-long">
                        <span className="form-span-long">关键字：</span>
                        <div className="form-div-long">
                            <Input
                                style={{width:"100%"}}
                                size="large"
                                placeholder="请输入搜索关键字"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </li>
                    <li className="form-li-button">
                        <div>
                            <Button type="primary" size="large" onClick={this.handleSearch}><Icon type="search"/>查找</Button>
                            <Button type=""  size="large" onClick={this.handleAdd} ><Icon type="plus"/>添加</Button>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Search;