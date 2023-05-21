<template>

    <div>

        <div style="padding: 10px 0">
            <el-input style="width: 200px" placeholder="请输入搜索的角色名" v-model="name"></el-input>
            <el-button class="ml-5" type="primary" @click="searchUser">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
          </div>

          <div style="margin: 10px;">
              <el-button type="primary" @click="handleAdd">添加<i class="el-icon-circle-plus-outline"></i></el-button>
              <el-button type="danger" @click="handleDatchDel">批量删除<i class="el-icon-remove-outline"></i></el-button>
          </div>

          <el-table :data="tableData"  @selection-change="handleSelectionChange" row-key="id" default-expand-all>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="编号" width="140">
            </el-table-column>
            <el-table-column prop="name" label="菜单名" width="200">
            </el-table-column>
            <el-table-column prop="path" label="路径" width="200">
            </el-table-column>
            <el-table-column prop="icon" label="图标" width="200">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="500">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                <el-button type="success" @click="handleAdd(scope.row.id)" v-if="!scope.row.pid && !scope.row.path">新增子菜单<i class="el-icon-edit"></i></el-button>
                <el-button type="danger" @click="handleDel(scope.row.id)">删除<i class="el-icon-remove-outline"></i></el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- add -->
          <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="120px">
              <el-form-item label="菜单名称">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="路径">
                <el-input v-model="form.path" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-input v-model="form.icon" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="form.description" autocomplete="off"></el-input>
              </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
export default {
    name: "User",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            name: '',
            path: '',
            icon: '',
            description: '',
            dialogFormVisible: false,
            form: {},
            visible: false,
        }
    },

    created() {
        this.load();
    },

    methods: {
        load() {
            this.request.get("/menu", {
                params: {
                  pageNum: this.pageNum,
                  pageSize: this.pageSize,
                  name: this.name,
                }
        }).then(res => {
                this.tableData = res.data
                // this.total = res.total
                console.log(res);
            })
        },

        searchUser() {
            this.load();
        },
        reset() {
            this.name = "";
            this.load();
        },
        handleAdd(pid) {
            this.dialogFormVisible = true
            this.form = {}
            if (pid) {
              this.form.pid = pid
            }
        },
        save() {
            this.request.post("/menu", this.form).then(res => {
                if (res) {
                    this.$message.success("添加成功");
                    this.dialogFormVisible = false;
                    this.load();
                } else {
                    this.$message.error("添加失败");
            
            }
        })
        
        },
        handleEdit(row) {
            this.form = row
            this.dialogFormVisible = true
        },
        
        handleDel(id) {
            this.request.delete("/menu/" + id).then(res => {
            if (res) {
                this.$message.success("删除成功");
                this.load();
            } else {
                this.$message.error("删除失败");
            }
        })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        handleDatchDel() {
            let ids = this.multipleSelection.map(v => v.id);
            this.request.post("/menu/del/batch", ids).then(res => {
            if (res) {
                this.$message.success("删除成功");
                this.load();
            } else {
                this.$message.error("删除失败");
            }
          })
        },

    }
}
</script>

<style scoped>

</style>
