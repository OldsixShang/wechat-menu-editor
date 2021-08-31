<template>
    <div class="wechat-menu-editor">
      <header>
          <!--header-->
          <div class="status-bar flex flex-justify">
            <div>10:00</div>
            <div class="flex">
                <div class="flex signal">
                    <i></i><i></i><i></i><i></i>
                </div>
                <div>4G</div>
                <div class="battery"></div>
            </div>
          </div>
          <div class="title-bar flex flex-justify">
              <div><i class="icon icon-left"></i></div>
              <div>{{title}}</div>
              <div><i class="icon icon-user"></i></div>
          </div>
        </header>
        <footer>
          <i class="icon icon-keyboard"></i>
          <div class="menus flex">
            <div
              v-for="menu in menus"
              v-bind:key="menu.id"
              @click.stop="clickRootMenu(menu)"
              class="menu-item"
              :class="buildRootMenuClass(menu)"
            >
              <a>{{ menu.name }}</a>
              <div v-if="menu.selected" class="menu-children">
                <div class="menu-items">
                  <div
                    v-for="childMenu in menu.children"
                    v-bind:key="childMenu.id"
                    @click.stop="clickChildMenu(menu, childMenu)"
                    :class="buildChildMenuClass(childMenu)"
                    class="menu-item"
                  >
                    {{ childMenu.name }}
                  </div>
                </div>
                <div class="triangle-down"></div>
              </div>
            </div>
          </div>
        </footer>
    </div>
</template>

<script>
import './css/icon.css'
import './css/base.css'
/**
 * 菜单选中事件名称
 */
const EVENT_MENU_SELECTED = 'menuselected';
/**
 * 菜单类型
 */
const MENU_TYPE = { ADD: 'add', NORMAL:'normal'};

export default {
  name: "WechatMenuEditor",
  props: {
    title: {
      type:String,
      default:'公众号名称'
    },
    menus: {
      type:Array,
      default:function(){
        return [{ type: MENU_TYPE.ADD, name: "+添加菜单" }];
      }
    },
    editable:{
      type:Boolean,
      default:true
    }
  },
  data(){
      return {
          selectedMenu:{}
      };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      let rootMenuLen = this.menus.length;
      if(rootMenuLen == 0 && this.editable){
        this.menus.push({ type: MENU_TYPE.ADD, name: "+添加菜单" });
      }else if(this.editable && rootMenuLen < 3 && !this.menus.some(m=> m.type === MENU_TYPE.ADD)){
        this.menus.push({ type: MENU_TYPE.ADD, name: "+" });
      }
      for (var i = 0; i < rootMenuLen; i++) {
        let rootMenu = this.menus[i];
        if (rootMenu.selected) {
          this.clicRootkMenu(rootMenu);
          for (var j = 0,clen = rootMenu.children.length; j < clen; j++) {
            let childMenu = rootMenu.children[j];
            if (childMenu.selected) {
              this.clickChildMenu(rootMenu, childMenu);
              return;
            }
          }
          return;
        }
      }
    },
    /**
     * 构建一级菜单样式
     */
    buildRootMenuClass(menu){
      return (menu.type === MENU_TYPE.ADD ? 'menu-item-add':'') + (menu.selected ? 'selected' : '' ) + (!this.editable && menu.type===MENU_TYPE.ADD? 'hide':'');
    },
    /**
     * 构建一级菜单样式
     */
    buildChildMenuClass(menu){
      return (menu.selected ? 'selected' : '' ) + (!this.editable && menu.type===MENU_TYPE.ADD? 'hide':'');
    },
    /**
     * 初始化一级菜单
     */
    buildDefaultRootMenu() {
      var defaultMenu = { id: 0, type: MENU_TYPE.NORMAL ,name: "添加菜单", children: []};
      defaultMenu.id = new Date().getTime();
      defaultMenu.selected = true;
      defaultMenu.children.push({ type: MENU_TYPE.ADD, name: "+" });
      return defaultMenu;
    },
    /**
     * 点击一级菜单
     */
    clickRootMenu(currentMenu) {
      this.menus.forEach(menu=>{ menu.selected = false; });
      if (currentMenu.type == MENU_TYPE.ADD) {
        let newMenu = this.buildDefaultRootMenu();
        let menuLen = this.menus.length;
        if (menuLen <= 2) {
          this.menus.splice(menuLen - 1, 0, newMenu);
          this.menus[menuLen].name = "+";
        } else {
          this.menus.splice(2, 0, newMenu);
          this.menus.splice(3, 1);
        }
        this.selectedMenu = newMenu;
      } else {
        currentMenu.selected = true;
        this.selectedMenu = currentMenu;
      }
      // 触发菜单选中事件
      this.$emit(EVENT_MENU_SELECTED,this.selectedMenu);
    },
    /**
     * 点击子菜单
     */
    clickChildMenu(parentMenu, currentMenu) {
      for (var i = 0; i < parentMenu.children.length; i++) {
        parentMenu.children[i].selected = false;
      }
      if (currentMenu.type == MENU_TYPE.ADD) {
        var defaultMenu = {
          id: new Date().getTime(),
          pid: parentMenu.id,
          type: MENU_TYPE.NORMAL,
          name: "添加子菜单",
          selected: true
        };
        if (parentMenu.children.length <= 4) {
          parentMenu.children.splice(
            parentMenu.children.length - 1,
            0,
            defaultMenu
          );
          parentMenu.children[parentMenu.children.length - 1].name = "+";
        } else {
          parentMenu.children.splice(4, 0, defaultMenu);
          parentMenu.children.splice(5, 1);
        }
        this.selectedMenu = defaultMenu;
      } else {
        currentMenu.selected = true;
        this.selectedMenu = currentMenu;
      }
      // 触发菜单选中事件
      this.$emit(EVENT_MENU_SELECTED,this.selectedMenu);
    },
  },
};
</script>

<style scoped>
.wechat-menu-editor{
  background-repeat: no-repeat;
  width: 375px;
  height: 667px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  background: #ebebeb;
  padding: 0;
}
.wechat-menu-editor header .status-bar{
    height: 32px;
    padding: 0 16px;
    font-size: 12px;
    line-height: 32px;
    font-weight: bold;
}
.wechat-menu-editor header .status-bar .signal {
    margin-right: 4px;
}
.wechat-menu-editor header .status-bar .signal i{
    display: inline-block;
    background: #333;
    width: 2px;
    border-radius: 2px;
    margin-right: 1px;
    height: 10px;
}
.wechat-menu-editor header .status-bar .signal i:nth-child(1){
    height: 4px;
}
.wechat-menu-editor header .status-bar .signal i:nth-child(2){
    height: 6px;
}
.wechat-menu-editor header .status-bar .signal i:nth-child(3){
    height: 8px;
}
.wechat-menu-editor header .status-bar .battery{
    width: 24px;
    background: #333;
    height: 12px;
    margin: 9px 4px;
    border-radius: 2px;
    position: relative;
}
.wechat-menu-editor header .status-bar .battery::after{
    content: ' ';
    position:absolute;
    background: #333;
    right: -2px;
    top:4px;
    height: 4px;
    width: 2px;
    border-radius: 0 1px 1px 0;
}

.wechat-menu-editor header .title-bar{
    padding: 0 16px;
    line-height: 48px;
    font-size: 16px;
    font-weight: bold;
}
.wechat-menu-editor header .title-bar .icon{
    font-size: 18px;
}

.wechat-menu-editor footer {
  background: #f5f5f5;
  height: 48px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.wechat-menu-editor footer .icon-keyboard{
    display:block;text-align:center;width:48px;line-height:48px;font-size:32px;
}
.wechat-menu-editor footer .menus {
  position: absolute;
  left: 48px;
  right: 0;
  height: 48px;
  bottom: 0;
  display: flex;
}
.wechat-menu-editor footer .menus .menu-item {
  line-height: 48px;
  text-align: center;
  border-left: 1px solid #eee;
  flex-grow: 2;
  -webkit-flex-grow: 2;
  font-size: 12px;
  position: relative;
  background: #f5f5f5;
}
.wechat-menu-editor footer .menus .menu-item.selected {
  border: 1px solid #33cc5c;
}
.wechat-menu-editor footer .menus .menu-item.hide{
  display:none;
}
.wechat-menu-editor footer .menus .menu-item.menu-item-add {
  flex-grow: 1;
  -webkit-flex-grow: 1;
}
.wechat-menu-editor footer .menus .menu-item .menu-children {
  position: absolute;
  bottom: 49px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
}
.wechat-menu-editor footer .menus .menu-item .menu-children .triangle-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #f5f5f5;
  margin: 0 auto;
}
.wechat-menu-editor footer .menus .menu-item .menu-children .menu-item {
  border: none;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  color: #999999;
}
.wechat-menu-editor footer .menus .menu-item .menu-children .menu-item:nth-child(1){
  border-radius: 4px 4px 0 0;
}
.wechat-menu-editor footer .menus .menu-item .menu-children .menu-item.selected {
  border: 1px solid #33cc5c;
  color: #33cc5c;
}
</style>