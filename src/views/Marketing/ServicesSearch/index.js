/**
 * Created by lay on 2017/3/22.
 */

import React from 'react';
import {Table,Icon,Button,message} from 'antd';
import action from './../../../components/actions/tables';
import {connect} from 'react-redux';
import ajaxServices from './../../../components/modules/ajaxService';
import DiyModal from '../../../components/modules/Modal/Modal';
import DiyForm from './diyForm';

class ServicesSearch extends React.Component{
    constructor(props){
        super(props);
        this.componentWillMount=this.componentWillMount.bind(this);
        this.modal_handleOk=this.modal_handleOk.bind(this);
        this.modal_handleCancel=this.modal_handleCancel.bind(this);
        this.revise=this.revise.bind(this);
        this.otherShow=this.otherShow.bind(this);
        this.backPrevious=this.backPrevious.bind(this);
        this.state={
            tableData:null,//表格数据
            modal_title:"",//弹窗标题,
            modal_visible:false,//弹窗是否可见
            modal_content:"",//弹窗内容
            modal_index:"",//当前打开的index
            other_table:[],//其他
            other_table_header:"",
            other_table_item:"",
        }
    }
    componentWillMount(){
        const {dispatch}=this.props;
        //获取表格数据
        ajaxServices.reqwestJson({},"./../../../../data/marketing/servicesSearch/tableData.json",(response)=>{
            let tableData=response.data.tableData;//表格数据
            dispatch(action.init(tableData));//将表格数据传入，做init初始化数据
        });

    }
    // 其他
    otherShow(record,index){
       return (
       ()=>{
            this.setState({other_table:record.others,other_table_item:record})
        }
       )
    }
    //表格修改
    revise(record,index){
        return (
            ()=>{
                this.setState({modal_title:"修改信息",modal_visible:true,modal_content:record,modal_index:index});
            }
        )
    }
    // 弹窗确定
    modal_handleOk(value){
        this.setState({modal_visible:false,modal_content:""});
        const {dispatch} = this.props;
        dispatch(action.revise(value,this.state.modal_index))
    }
    //弹窗取消
    modal_handleCancel(){
        this.setState({modal_visible:false,modal_content:""});
    }
    //返回上一级
    backPrevious(){
        let tablesData=this.props.tablesReducer;//当前表格全部数据
        let findLeval=(data,nowItem={})=>{//传递当前所有层级的数据，当前操作的项
            // if(!this.state.other_table_item){
            //     return;
            // }
            for(let i=0;i<data.length;i++){
               let pItems=nowItem;//当前操作的数据项的层级，即点击返回上一级，所对应的层级。
                let tablesItem=data[i];//当前操作的数据项
                if(tablesItem==this.state.other_table_item){
                    if(data==this.props.tablesReducer){
                        message.warn("当前已是最高层级！");
                        return;
                    }
                    this.setState({other_table:data,other_table_item:pItems});//设置对应的表格显示数据
                    return

                }else if(tablesItem.others&&tablesItem.others.length>0){
                    findLeval(tablesItem.others,tablesItem)
                }
            }
        };
        findLeval(tablesData,this.state.other_table);
    }
    render(){
        const columns=[
            {
                title:"姓名",
                dataIndex:"name",
                key:"name",
            },
            {
                title:"年龄",
                dataIndex:"age",
                key:"age"
            },
            {
                title:"爱好",
                dataIndex:"hobbies",
                key:"hobbies",
                render:(text,record,index)=>{
                    return ({
                        if(text){
                            text.map((item,index)=>{
                                if(index==text.length-1)return item;
                                else return item+',';
                            })
                        }
                    })
                }
            },
            {
                title:"",
                render:(text,record,index)=>{
                return (
                    <div>
                        <button type="button" className="btn btn-xs btn-info" onClick={this.otherShow(record,index)}>其他</button>
                        <button type="button" className="btn btn-xs btn-success" onClick={this.revise(record,index)}>修改</button>
                    </div>
                )
        }
            }
        ];
        const other_columns=[
            {
                title:"姓名",
                dataIndex:"name",
                key:"name"
            },
            {
                title:"年龄",
                dataIndex:"age",
                key:"age",
            },
            {
                title:"关系",
                dataIndex:"relationship",
                key:"relationship",
            },
            {
                title:"工作",
                dataIndex:"work",
                key:"work",
            },
            {
                title:"",
                render:(text,record,index)=>{
                    return (
                        <div>
                            <button type="button" className="btn btn-xs btn-info" onClick={this.otherShow(record,index)}>其他</button>
                        </div>
                    )
                }
            }
        ];
        return(
            <div style={{background:"#fff"}}>
                <div  style={{padding:"1.2rem"}} className="clear">
                    <div className="fl text-center" style={{width:"45%"}}>
                        <Table
                            columns={columns}
                            dataSource={this.props.tablesReducer}
                            bordered={true}
                            size="small"
                            rowClassName={(record,index)=>{

                            }}
                        >

                        </Table>
                    </div>
                    <div className="fr" style={{width:"45%"}}>
                       <div style={{margin:'1.2rem'}} className="clear">
                           <span style={{display:"inline-block",width:"70%",textAlign:"center"}}>{this.state.other_table_item.name}</span>
                           <Button type="button" className="btn btn-success fr" onClick={this.backPrevious}>返回上一层</Button>
                       </div>
                        <Table
                            columns={other_columns}
                            dataSource={this.state.other_table}
                            bordered={true}
                            size="small"
                            pagination={false}
                        >

                        </Table>
                    </div>
                </div>
                <DiyModal
                    title={this.state.modal_title}
                    visible={this.state.modal_visible}
                    handleCancel={this.modal_handleCancel}
                >
                    <DiyForm
                        handleSubmit={this.modal_handleOk}
                        handleCancel={this.modal_handleCancel}
                        currentItem={this.state.modal_content}
                    />
                </DiyModal>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return state
};

ServicesSearch=connect(mapStateToProps)(ServicesSearch);

export default ServicesSearch;