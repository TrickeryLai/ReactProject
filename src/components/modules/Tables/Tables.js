/**
 * Created by lay on 2017/3/23.
 */

import React from 'react';
import {Table} from 'antd';
import reqwest from 'reqwest';
import {connect} from 'react-redux';
import action from './../../actions/tables';

class Tables extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            data:[],
            pagination:{},
            params:this.props.params
        };
        this.fetch=this.fetch.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
    }
    handleTableChange(pagination, filters, sorter){
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch(params){
        const {dispatch}=this.props;
       this.setState({loading:true});
       reqwest({
           url:this.props.url,
           method:'get',
           data:{
               results:10,
               ...params,
           },
           type:'json',
       }).then(data=>{
           const pagination={...this.state.pagination};
           pagination.total=200;
           this.setState({
               loading:false,
               data:data.data,
               pagination
           });
           dispatch(action.init(data.data))
       })
    }
    componentDidMount(){
        this.fetch();
    }
    render(){
        return (
            <Table columns={this.props.columns}
                   rowKey={record => record.key}
                   dataSource={this.props.tablesReducer}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            />
        )
    }
}

const mapStateToProps=(state)=>{
    return state
};

Tables=connect(mapStateToProps)(Tables);

export default {Tables};