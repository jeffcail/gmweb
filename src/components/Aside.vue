<template>
    <el-menu :default-openeds="['1', '3']" style="height: 100%; overflow-x: hidden;" 
                  background-color="rgb(48, 65, 86)"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  :collapse-transition="false"
                  :collapse="isCollapse"
                  router
                  @select="handleSelect"
        >

        <div style="line-height: 60px; text-align: center;">
          <img src="../assets/logo.png" style="width: 20px; position: relative; top: 5px; margin-right: 8px;" />
          <b style="color:white" v-show="logoTextShow">通用后台管理系统</b>
        </div>


          <el-menu-item index="/">
            <template slot="title">
              <i class="el-icon-house"></i>
              <span slot="title">主页</span>
            </template>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-s-custom"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/role">
              <i class="el-icon-s-custom"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/menu">
              <i class="el-icon-menu"></i>
              <span slot="title">菜单管理</span>
            </el-menu-item>
          
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">文件管理</span>
            </template>
            <el-menu-item index="/file">
              <i class="el-icon-s-document"></i>
              <span slot="title">文件管理</span>
            </el-menu-item>
          
          </el-submenu>
        </el-menu>
</template>

<script>
export default {
    name: "Aside",
    props: {
        isCollapse: Boolean,
        logoTextShow: Boolean,
    },

    methods: {
      handleSelect(index) {
        
      },

    },

}
</script>


<style scoped>

</style>
