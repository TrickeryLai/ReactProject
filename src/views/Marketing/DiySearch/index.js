/**
 * Created by lay on 2017/3/22.
 */

import React from 'react';
import ajaxService from '../../../components/modules/ajaxService/index';
import action from './../../../components/actions/tables';
import {connect} from 'react-redux';
import showConfirm from '../../../components/modules/Modal/showConfirm';
import DiyModal from '../../../components/modules/Modal/Modal';
import message from '../../../components/modules/Modal/message';
import {Button,Icon,Table} from 'antd';
import DiyForm from './diyForm';
import Search from './search'

class DiySearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            modalTitle:null,
            currentItem:{},
            index:'',
            params:[],//搜索内容
            loading:false,
            data:[],
            pagination:{},
            columns : [
                {title: 'Name',
                    dataIndex: 'name',
                    sorter: true,
                },
                {
                title: 'Gender',
                dataIndex: 'gender',
                filters: [
                    { text: 'Male', value: 'male' },
                    { text: 'Female', value: 'female' },
                ],
            },
                {
                title: 'Age',
                dataIndex: 'age',
            },
                {
                title: 'address',
                dataIndex: 'address',
                render: (name) => {
                    if(name){
                        let string='';
                        name.forEach(item=>{
                            string+=item+'/';
                        });
                        return string
                    }
                },
            },
                {
                title: 'Email',
                dataIndex: 'email',
            },
                {
                title:'Action',
                render:(text,record,index)=>{
                    return (
                        <span>
                <button type="button" onClick={this.handleRevise(record,index)} className="btn btn-xs btn-success">修改</button>
                <button type="button" onClick={this.handleDel(record,index)} className="btn btn-xs btn-danger">删除</button>
            </span>
                    )
                }
                }
            ]
        };
        this.handleDel=this.handleDel.bind(this);
        this.handleRevise=this.handleRevise.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.fetch=this.fetch.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this);
        // this.componentWillMount=this.componentWillMount.bind(this);
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
    //查找函数，将搜素对象发送
    fetch(params){
        const {dispatch}=this.props;
        this.setState({loading:true});
        ajaxService.reqwestJson({
                results:10,
                ...params,
            },'./../../../data/tables/tables1.json',
        (data)=>{
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
    //查找
    handleSearch(params){
       this.fetch(params)
    }
    //修改
    handleRevise(state,index){
       return ()=>{
           this.setState({visible:true,modalTitle:'修改用户',currentItem:state,index});//打开modal
           const {dispatch} = this.props;
           dispatch(action.revise(state,index))
       }
    }
    //添加
    handleAdd(state){
        this.setState({visible:true,modalTitle:'添加用户',currentItem:{},});//打开modal
        // const {dispatch} = this.props;
        // dispatch(action.add(state))
    }
    //删除
    handleDel(state,index){
        return ()=>{
            let setting={
                title:'提示',
                content:'确定删除么?',
                onOk:()=>{
                    const {dispatch} = this.props;
                    dispatch(action.del(state,index));
                    message.success('删除成功')
                },
                onCancel:()=>{

                }
            };

            showConfirm(setting);
        }
    }
    //modal--确认
    handleOk(state){
        const {dispatch} = this.props;
        this.setState({visible:false});
        switch(this.state.modalTitle){
            case '修改用户':
                return dispatch(action.revise(state,this.state.index));
            case '添加用户':
                return dispatch(action.add(state));
            default:
                return ;
        }
    }
    //modal--取消
    handleCancel(){
        this.setState({visible:false})
    }
    // componentWillMount(){
    //     const {dispatch} = this.props;
    //     this.fetch({params:{aa:11}})
    // }
    componentDidMount(){
        const {dispatch} = this.props;
        this.fetch({params:{aa:11}})
    }

    render(){
        return(
            <div className="border-1px content bg-fff">
                <div style={{padding:"1.2rem"}}>
                    <div style={{padding:"1.2rem",marginBottom:"1.2rem"}} className="border-1px">
                        <Search  handleSearch={this.handleSearch} handleAdd={this.handleAdd}/>
                        {/*<Button type="primary" size="large" onClick={this.handleSearch}><Icon type="search"/>查找</Button>*/}
                        {/*<Button type=""  size="large" onClick={this.handleAdd} ><Icon type="plus"/>添加</Button>*/}
                    </div>
                    {/*<Tables columns={this.state.columns} url='./../../../data/tables/tables1.json' params={this.state.params}/>*/}
                    <Table columns={this.state.columns}
                           rowKey={record => record.key}
                           dataSource={this.props.tablesReducer}
                           pagination={this.state.pagination}
                           loading={this.state.loading}
                           onChange={this.handleTableChange}
                           bordered={true}
                    />
                    <DiyModal
                        visible={this.state.visible}
                        title={this.state.modalTitle}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                    >
                        <DiyForm  currentItem={this.state.currentItem} handleSubmit={this.handleOk} handleCancel={this.handleCancel}/>
                    </DiyModal>
                </div>
            </div>

        )
    }
}

const mapStateToProps=(state)=>{
    return state
};

DiySearch=connect(mapStateToProps)(DiySearch);

export default DiySearch;