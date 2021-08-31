<template>
  <div id="app">
    <wechat-menu-editor :title="'公众号名称'" :editable="true" :menus="menus" @menuselected="menuselected" />
  </div>
</template>

<script>

export default {
  name: 'Demo',
  data(){
    return {
      menus:[],
    }
  },
  methods:{
    menuselected(menu){
      console.log(menu);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
