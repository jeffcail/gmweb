<template>
  <div height="100%">
    <el-container style="line-height: 100%;">
      <el-aside :width="asideWidth+'px'" style="background-color: rgb(238, 241, 246); line-height: 100%; height: 100vh; overflow-x: hidden;">
        <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"/>
      </el-aside>
      
      <el-container>
        <el-header>

          <Header :collapseBtnClass="collapseBtnClass" :isCollapse="isCollapse" :pathName="pathName"/>
        
        </el-header>
        
        <el-main>
          <router-view />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'


export default {

  data() {
      return {    
        collapseBtnClass: 'el-icon-s-fold',
        isCollapse: false,
        asideWidth: 200,
        logoTextShow: true, 
        pathName: String,
      }
    },

  components: {
    Aside,
    Header,
  },

  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.asideWidth = 64;
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.logoTextShow = false;
      } else {
        this.asideWidth = 200;
        this.collapseBtnClass = 'el-icon-s-fold';
        this.logoTextShow = true;
      }
    },

    
  },
}
</script>
