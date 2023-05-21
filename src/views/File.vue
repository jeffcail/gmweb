<template>

    <div>

        <div style="margin: 10px;">
              <el-button type="danger" @click="handleDatchDel">批量删除<i class="el-icon-remove-outline"></i></el-button>

              <el-upload action="http://localhost:9000/file/upload" style="display: inline-block;" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportS">
                <el-button type="success" class="ml-5">上传<i class="el-icon-top"></i></el-button>
              </el-upload>
              
          </div>

        <el-table :data="tableData"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="编号" width="140">
            </el-table-column>
            <el-table-column prop="filename" label="文件名称" width="140">
            </el-table-column>
            <el-table-column prop="ext" label="文件后缀" width="120">
            </el-table-column>
            <el-table-column prop="size" label="文件大小" width="120">
            </el-table-column>

            <el-table-column prop="url" label="地址" width="260">
            </el-table-column>
<!-- 
            <el-table-column width="120">
                <template slot-scope="scope">
                    <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
                </template>
            </el-table-column> -->

            <el-table-column prop="isenable" label="状态">
                <template slot-scope="scope">
                    <el-switch @change="changeEnable(scope.row)" v-model="scope.row.isenable" active-color="#13ce66" inactive-color="#cc"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
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

    </div>

</template>

<script>

export default {
    name: "File",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 10,
            filename: '',
            ext: '',

        };
    },

    created() {
        this.load();
    },

    methods: {
        load() {
            this.request.get("/file/page", {
                params: {
                    pageNum: this .pageNum,
                    pageSize: this.pageSize,
                    filename: this.filename,
                }
            }).then(res => {
                console.log(res.data);
                this.tableData = res.data.records;
                this.total = res.data.total;
            });
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum;
            this.load();
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.load();
        },
        searchUser() {
            this.load();
        },

        changeEnable(row) {
            this.request.post("/file/update", row).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.msg);
                    this.load();
                } else {
                    this.$message.error(res.msg);
                }
            })
        },

        handleDel(id) {
            this.request.delete("/file/" + id).then(res => {
                if (res) {
                    this.$message.success("删除成功");
                    this.load();
                }
                else {
                    this.$message.error("删除失败");
                }
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleDatchDel() {
            let ids = this.multipleSelection.map(v => v.id);
            this.request.post("/file/del/batch", ids).then(res => {
                if (res) {
                    this.$message.success("删除成功");
                    this.load();
                }
                else {
                    this.$message.error("删除失败");
                }
            });
        },

        download(url) {
            window.open(url);
        },
        handleExcelImportS() {
          this.$message.success("文件导入成功");
          this.load();
        },
    },

}
</script>

<style scoped>

</style>
