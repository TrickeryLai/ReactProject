
import React from 'react';
import {Form,Input, Select,Radio ,Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class DiyForm extends React.Component{
    constructor(props){
        super(props);
        this.handleOk=this.handleOk.bind(this);
        this.state={
            columns:[
                {
                    title:"姓名",
                    dataIndex:"name",
                    render:(value)=>{
                        return (
                            <Input  defaultValue={value} readOnly/>
                        )
                    }
                },
                {
                    title:"年龄",
                    dataIndex:"age",
                    render:(value)=>{
                        return (<Input  defaultValue={value}/>)
                    }
                },
                {
                    title:"关系",
                    dataIndex:"relationship",
                    render:(value)=>{
                        return (<Input defaultValue={value} />)
                    }
                }
            ],
            hobbies:[
                {
                    key:"1",
                    value:"吃"
                },
                {
                    key:"2",
                    value:"喝"
                },
                {
                    key:"3",
                    value:"玩"
                },
                {
                    key:"4",
                    value:"乐"
                },
                {
                    key:"5",
                    value:"工作"
                },
                {
                    key:"6",
                    value:"美食"
                },
                {
                    key:"7",
                    value:"游戏"
                }
            ]
        }
    }
    handleOk(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if (!err) {
                this.props.handleSubmit(values)
            }
        });
    }
    handleChange(value){
        console.log(`selected ${value}`)
    }
    render(){
        const {hobbies} = this.state;
        const {getFieldDecorator} = this .props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 0,
                },
            },
        };
        const item=this.props.currentItem;
        return (
            <Form onSubmit={this.handleOk}>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                    hasFeedback//展示校验图标
                >
                    {getFieldDecorator('name',{
                        initialValue:item.name?item.name:'',
                        rules:[
                            {required:true,message:'Please input your name'}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="年龄"
                    hasFeedback
                >
                    {getFieldDecorator('age',{
                        initialValue:item.age?item.age:'',
                        rules:[
                            {required:true,message:'Please input your age'}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="爱好"
                    hasFeedback
                >
                    {getFieldDecorator('hobbies',{
                        initialValue:item.hobbies?item.hobbies:'',
                        rules:[
                            //{type:'number',message:'The input is not vaild number'},
                            {required:true,message:'Please input your hobbies'}
                        ]
                    })(
                        <Select
                            mode="tags"
                            style={{}}
                            tokenSeparators={[';',","]}//分割
                            onChange={this.handleChange}
                        >
                            {hobbies.map(item=><Option key={item.key} value={item.value}>{item.value}</Option>)}
                        </Select>
                    )}
                </FormItem>
                {/*<FormItem*/}
                    {/*{...tailFormItemLayout}*/}
                    {/*label=""*/}
                    {/*colon={false}*/}
                {/*>*/}
                    {/*<h4 style={{fontSize:"1.4rem",color:"#666",paddingLeft:"1.2rem"}}>其他</h4>*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                    {/*{...tailFormItemLayout}*/}
                {/*>*/}
                    {/*{getFieldDecorator("others",{*/}
                        {/*initialValue:item.others?item.others:""*/}
                    {/*})(*/}
                        {/*<Table columns={this.state.columns}*/}
                               {/*rowKey={record => record.key}*/}
                               {/*dataSource={item.others}*/}
                               {/*onChange={this.handleTableChange}*/}
                               {/*bordered={true}*/}
                               {/*size="small"*/}
                        {/*/>*/}
                    {/*)*/}
                    {/*}*/}
                {/*</FormItem>*/}
                <FormItem
                    {...tailFormItemLayout}
                >
                    <Button type="primary" htmlType="submit" size="large" style={{marginLeft:'5px'}} className='fr'>确认</Button>
                    <Button type=""  size="large" className='fr' onClick={this.props.handleCancel}>取消</Button>
                </FormItem>
            </Form>
        )
    }
}

DiyForm = Form.create()(DiyForm);

export default DiyForm;