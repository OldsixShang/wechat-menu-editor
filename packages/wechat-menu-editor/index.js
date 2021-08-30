import WechatMenuEditor from './src/index.vue'

WechatMenuEditor.install = function(Vue){
    Vue.component(WechatMenuEditor.name,WechatMenuEditor);
}

export default WechatMenuEditor;