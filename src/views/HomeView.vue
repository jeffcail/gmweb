<template>
  <div height="100%">
    <el-container style="line-height: 100%;">
      <el-aside :width="asideWidth+'px'" style="background-color: rgb(238, 241, 246); line-height: 100%;">
        <el-menu :default-openeds="['1', '3']" style="height: 100%; overflow-x: hidden;" 
                  background-color="rgb(48, 65, 86)"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  :collapse-transition="false"
                  :collapse="isCollapse"
        >

        <div style="line-height: 60px; text-align: center;">
          <img src="../assets/logo.png" style="width: 20px; position: relative; top: 5px; margin-right: 8px;" />
          <b style="color:white" v-show="logoTextShow">通用后台管理系统</b>
        </div>


          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex;">

          <div style="flex: 1; font-size: 10px;">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div>

          <el-dropdown style="width: 100px; cursor: pointer;">
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        
        </el-header>
        
        <el-main>

          <div style="padding: 10px 0">
            <el-input style="width: 200px" placeholder="请输入搜索的内容" v-model="username"></el-input>
            <!-- <el-input style="width: 200px" placeholder="请输入搜索的内容" class="ml-5"></el-input>
            <el-input style="width: 200px" placeholder="请输入搜索的内容" class="ml-5"></el-input> -->
            <el-button class="ml-5" type="primary" @click="searchUser">搜索</el-button>
          </div>

          <div style="margin: 10px;">
              <el-button type="primary">添加<i class="el-icon-circle-plus-outline"></i></el-button>
              <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
              <el-button type="success">导入<i class="el-icon-top"></i></el-button>
              <el-button type="success">导出<i class="el-icon-bottom"></i></el-button>
          </div>

          <el-table :data="tableData">
            <el-table-column prop="id" label="编号" width="140">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="140">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作">
              <el-button type="success">编辑<i class="el-icon-edit"></i></el-button>
              <el-button type="danger">删除<i class="el-icon-remove-outline"></i></el-button>
            </el-table-column>
          </el-table>

          <div style="padding: 10px 0;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[2, 10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {

  data() {
      return {
        tableData: [],
        total: 0,
        pageNum: 1,
        pageSize: 2,
        collapseBtnClass: 'el-icon-s-fold',
        isCollapse: false,
        asideWidth: 200,
        logoTextShow: true,
        username: '',
      }
    },

  name: 'HomeView',
  components: {
    HelloWorld
  },

  created() {
    this.load();
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

    load() {
      fetch("http://localhost:9000/user/list/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&username="+this.username).then(res => res.json()).then(res => {
        this.tableData = res.data;
        this.total = res.total;
      });
    },

    handleCurrentChange(pageNum) {
      // console.log(pageNum);
      this.pageNum = pageNum;
      this.load();
    },
    handleSizeChange(pageSize) {
      // console.log(pageSize);
      this.pageSize = pageSize;
      this.load();
    },
    searchUser() {
      this.load();
    },
  },
}
</script>
