/**
 * Created by lay on 2017/3/24.
 */

import {Modal} from 'antd'

const {confirm} = Modal;

function showConfirm(setting){
    confirm({
        title:setting.title || '提示',//显示标题
        content:setting.content || '确定执行么？',//显示内容
        width:setting.width || '416px',//宽度
        iconType:setting.iconType || '',//图标类型
        okText:setting.okText || '确认',//确认按钮文字
        cancelText:setting.cancelText || '取消',//取消按钮文字
        maskClosable:setting.maskClosable || true,//点击模态层是否允许关闭
        onOk(){
            setting.onOk()
        },
        onCancel() {
            setting.onCancel();
        },
    })
}

export default showConfirm;