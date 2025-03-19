<template>
  <div class="home" style="padding: 30px">
    <div class= "top_box">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        style="width: 20%; margin-right: 200px"
        clearable
        @input="handleSearch"
      >
      </el-input>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!-- <el-button type="primary" @click="load">搜索</el-button> -->
      <el-button style="margin-left: 100px" type="success" @click="add" >添加</el-button>
    </div>

    <n-watermark
    content="核心机密"
    cross
    selectable
    :font-size="18"
    :line-height="16"
    :width="192"
    :height="128"
    :x-offset="12"
    :y-offset="28"
    :rotate="-15"
  >

    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%; margin-bottom: 10px"
    >


      <el-table-column prop="id" label="编号" width="180" sortable />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="department" label="科室" />
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column fixed="right" label="操作" width="150">

        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="你确定要删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </n-watermark>

    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑' : '添加'" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="男" size="large">男</el-radio>
          <el-radio v-model="form.sex" label="女" size="large">女</el-radio>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="form.department" />
        </el-form-item>
        <!-- <el-form-item label="日期">
          <el-input v-model="form.date" />
        </el-form-item> -->
        <el-form-item label="手机号">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { NWatermark } from 'naive-ui'

export default {
  name: "HomeView",
  components: {
    'n-watermark': NWatermark
  },
  setup() {
    const state = reactive({
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      search: "",
      form: {},
      dialogVisible: false,
    });

    const load = () => {
      axios
        .get("/api/work/findListByPage", {
          params: {
            pageNum: state.currentPage,
            pageSize: state.pageSize,
            search: state.search,
          },
        })
        .then((res) => {
          console.log(res);
          state.tableData = res.data.data;
          state.total = res.data.total;
        });
    };

    onMounted(() => {
      load();
    });
    const handleSearch = () => {
      state.currentPage = 1;
      load();
    };

    const handleCurrentChange = (pageNum) => {
      state.currentPage = pageNum;
      load();
    };

    const handleSizeChange = (pageSize) => {
      state.pageSize = pageSize;
      load();
    };

    const add = () => {
      state.dialogVisible = true;
      state.form = {};
    };

    const save = () => {
      if (state.form.id) {
        axios.post("/api/work/updateRegistered", state.form).then((res) => {
          if (res.data.code === 0) {
            ElMessage({
              message: "修改成功",
              type: "success",
            });
          } else {
            ElMessage.error(res.data.msg);
          }
          load();
          state.dialogVisible = false;
        });
      } else {
        axios.post("/api/work/addRegistered", state.form).then((res) => {
          if (res.data.code === 0) {
            ElMessage({
              message: "添加成功",
              type: "success",
            });
          } else {
            ElMessage.error(res.data.msg);
          }
          load();
          state.dialogVisible = false;
        });
      }
    };
    const handleEdit = (row) => {
      state.form = JSON.parse(JSON.stringify(row));
      state.dialogVisible = true;
    };

    const handleDelete = (id) => {
      console.log("id" + id);
      axios.get("/api/work/deleteRegisteredById/" + id).then((res) => {
        if (res.data.code === 0) {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
        } else {
          ElMessage.error(res.data.msg);
        }
        load();
        state.dialogVisible = false;
      });
    };

    return {
      ...toRefs(state),
      handleCurrentChange,
      handleSizeChange,
      load,
      add,
      save,
      handleSearch,
      handleEdit,
      handleDelete,
    };
  },
};
</script>
<style scoped>
.top_box{
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
}
</style>