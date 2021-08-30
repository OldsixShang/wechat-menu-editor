import WechatMenuEditor from "./wechat-menu-editor";

const components = [WechatMenuEditor];

const install = function(Vue){
    components.forEach(component=>{
        Vue.component(component.name,component);
    });
}

// 判断是否直接引入文件
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
}

export default{
    install,
    WechatMenuEditor
}