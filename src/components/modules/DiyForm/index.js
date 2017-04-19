
import React from 'react';
import {Form ,Input,Cascader,Radio,Button } from 'antd';

const FormItem = Form.Item;

// 根据类型判断使用类型
let choiceType=(item)=>{
    switch(item.type){
        case "input":
            return (<Input/>);
        case "cascader":
            return (<Cascader options={item.options}/>);
        case "radio":
            return (
                <Radio.Group>
                    item.options.map(i=>
                        <Radio value={i.value}>{i.name}</Radio>
                    )
                </Radio.Group>
            )
    }
};


class DiyForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

        const items=this.props.currentItem;//表单内的数据

        const {getFieldDecorator} = this.props.form;//用于和表单进行双向绑定

        // 设置样式
        const formItemLayout = {
            labelCol: {
                xs: {span:24},
                sm: {span:6},
            },
            wrapperCol:{
                xs: {span: 24},
                sm: {span :14},
            }
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
        return (
            <Form onSubmit={this.handleOk}>
                {
                    items.map((item)=>{
                        return (
                            <FormItem
                                {...formItemLayout}
                                label={item.labelName}
                            >
                                {getFieldDecorator(item.name,{
                                    initialValue:item.value?item.value:'',
                                    rules:[
                                        {
                                            required:item.required,
                                            message:item.message
                                        }
                                    ]
                                })
                                    ()
                                }
                            </FormItem>
                        )
                    })
                }

                <FormItem
                    {...tailFormItemLayout}
                >
                    <Button type="primary" htmlType="submit" size="large" style={{marginLeft:'5px'}} className="fr">确认</Button>
                    <Button type="" size="large" className="fr" onClick={this.props.handleCancel}>取消</Button>
                </FormItem>
            </Form>
        )
    }
}