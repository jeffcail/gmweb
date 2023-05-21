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

          <el-table :data="tableData"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="编号" width="140">
            </el-table-column>
            <el-table-column prop="name" label="角色名" width="140">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="500">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
                <el-button type="info" @click="handleMenu(scope.row.id)">分配权限<i class="el-icon-menu"></i></el-button>
                <el-button type="danger" @click="handleDel(scope.row.id)">删除<i class="el-icon-remove-outline"></i></el-button>
              </template>
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

          <!-- add -->
          <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="120px">
              <el-form-item label="角色名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
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

          <!-- 权限分配 -->
          <el-dialog title="分配权限" :visible.sync="menuDialogVisible">
            <el-tree
              :props="props"
              :data="menuData"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-expanded-keys="expends"
              :default-checked-keys="checks">
            </el-tree>
            <div slot="footer" class="dialog-footer">
              <el-button @click="menuDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
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
            description: '',
            dialogFormVisible: false,
            form: {},
            visible: false,
            menuDialogVisible: false,
            menuData: [],
            props: {
              label: "name",
            },
            expends:[],
            checks: [],
            roleId: 0,
        }
    },

    created() {
        this.load();
    },

    methods: {
        load() {
            this.request.get("/role/page", {
                params: {
                  pageNum: this.pageNum,
                  pageSize: this.pageSize,
                  name: this.name,
                }
        }).then(res => {
                this.tableData = res.records
                this.total = res.total
                // console.log(res);
            })
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
        reset() {
            this.name = "";
            this.load();
        },
        handleAdd() {
            this.dialogFormVisible = true
            this.form = {}
        },
        save() {
            this.request.post("/role", this.form).then(res => {
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
            this.request.delete("/role/" + id).then(res => {
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
            this.request.post("/role/del/batch", ids).then(res => {
            if (res) {
                this.$message.success("删除成功");
                this.load();
            } else {
                this.$message.error("删除失败");
            }
          })
        },

        handleMenu(id) {
          this.menuDialogVisible = true;
          this.roleId = id;

          this.request.get("/menu").then(res => {
            this.menuData = res.data
            this.expends = this.menuData.map(v => v.id)
          })

          this.request.get("role/roleMenu/" + id).then(res => {
              this.checks = res.data;
          })
        },
        saveRoleMenu() {
          // console.log(this.$refs.tree.getCheckedKeys());
          this.request.post("/role/roleMenu/" + this.roleId, this.$refs.tree.getCheckedKeys()).then(res => {
            if (res.code === '200') {
              this.$message.success(res.msg);
              this.menuDialogVisible = false;
            } else {
              this.$message.error(res.msg);
              this.menuDialogVisible = false;
            }
          })
        },
    }
}
</script>

<style scoped>

</style>
