
// 遮罩层

function Mask(content){
    this.maskId='diyMask';
    this.content=content ||'数据正在加载中 ....';
}
Mask.prototype={
    show:function(){
        this.hide();
        let mask= document.createElement('div');
        mask.className='diyMask';
        mask.id=this.maskId;
        mask.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;z-index:999;background:rgba(0,0,0,.5);';
        //遮罩层里面的内容
        let maskInner = document.createElement('div');
        maskInner.innerHTML='<span>'+this.content+'</span><img src="./images/mask.gif" alt="" style="width:20px;height:20px;">';
        maskInner.style.cssText='color:#fff;font-size:16px;width:100%;text-align:center;vertical-align:middle;margin:auto;position:absolute;left:0;right:0;top:0;bottom:0;height:50px;line-height:50px;';
        mask.appendChild(maskInner);
        document.body.appendChild(mask);
    },
    hide:function(){
        if(document.getElementById(this.maskId)){
            document.body.removeChild(document.getElementById(this.maskId))
        }
    }
};

export default {Mask};