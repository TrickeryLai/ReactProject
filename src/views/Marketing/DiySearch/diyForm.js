
import React from 'react';
import {Form,Input, Select,Cascader,Radio ,Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const options = [{
    value: '浙江',
    label: '浙江',
    children: [{
        value: '杭州',
        label: '杭州',
        children: [{
            value: '西湖',
            label: '西湖',
        }],
    }],
}, {
    value: '江苏',
    label: '江苏',
    children: [{
        value: '南京',
        label: '南京',
        children: [{
            value: '中华门',
            label: '中华门',
        }],
    }],
}];

class DiyForm extends React.Component{
    constructor(props){
        super(props);
        this.handleOk=this.handleOk.bind(this)
    }
    handleOk(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if (!err) {
                this.props.handleSubmit(values)
            }
        })
    }
    render(){
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
                    label="Name"
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
                    label="Age"
                    hasFeedback
                >
                    {getFieldDecorator('age',{
                        initialValue:item.age?item.age:'',
                        rules:[
                            //{type:'number',message:'The input is not vaild number'},
                            {required:true,message:'Please input your age'}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Address"
                    hasFeedback
                >
                    {getFieldDecorator('address',{
                        initialValue:item.address?item.address:'',
                        rules:[
                            {type:'array',required:true, message:'Please input your address'}
                        ]
                    })(
                        <Cascader options={options}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Email"
                    hasFeedback
                >
                    {getFieldDecorator('email',{
                        initialValue:item.email?item.email:'',
                        rules:[
                            {type:'email',message:'The input is not vaild email.'},
                            {required:true,message:'Please input the email'}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Gender"
                >
                    {getFieldDecorator("gender",{
                        initialValue:item.gender?item.gender:'male',
                        rules:[
                            {required:true, message:'Please chose your gender'}
                        ]
                    })(
                        <RadioGroup >
                            <Radio value='male'>male</Radio>
                            <Radio value='female'>female</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
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