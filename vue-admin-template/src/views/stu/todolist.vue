<template>
  <div class="app-container">
    <!-- 状态筛选 -->
    <el-radio-group v-model="filterStatus" @change="handleFilterChange" style="margin-bottom: 20px;">
      <el-radio :label="0">待完成</el-radio>
      <el-radio :label="1">已完成</el-radio>
    </el-radio-group>

    <!-- 作业列表 start -->
    <el-table
      :data="filteredAssignments.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        width="200" prop="name">
      </el-table-column>
      <el-table-column
        label="截止日期"
        width="150" prop="dueDate">
      </el-table-column>
      <el-table-column
        label="状态"
        width="150">
        <template slot-scope="scope">
          {{ getStatusText(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleViewAssignment(scope.row.id)">查看</el-button>
          <el-button
            v-if="scope.row.status === 0"
            size="mini"
            type="success"
            @click="handleSubmitAssignment(scope.row.id)">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 作业列表 end -->

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="filteredAssignments.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
import { getAssignmentsById } from '@/api/course'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      assignments: [],
      filterStatus: 0 // 默认显示待完成的作业
    }
  },
  computed: {
    filteredAssignments() {
      if (this.filterStatus === '') {
        return this.assignments;
      } else {
        return this.assignments.filter(assignment => assignment.status === this.filterStatus);
      }
    }
  },
  created() {
    this.getAssignments()
  },
  methods: {
    // 获取所有作业
    getAssignments() {
      getAssignmentsById(getToken()).then(response => {
        this.assignments = response.data.assignments
      })
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    // 根据状态返回相应的文本
    getStatusText(status) {
      switch (status) {
        case 0:
          return '待完成';
        case 1:
          return '已完成';
        default:
          return '未知';
      }
    },
    handleViewAssignment(id) {
      this.$router.push(`/stu/assignment/view/${id}`)
    },
    handleSubmitAssignment(id) {
      this.$router.push(`/stu/submit/${id}`)
    },
    handleFilterChange(value) {
      this.currentPage = 1; // 切换过滤条件时重置当前页码
    }
  }
}
</script>

<style scoped>
/* 添加一些样式以美化表格和对话框 */
.el-image {
  display: block;
  margin: auto;
}

.video-preview {
  display: block;
  margin: auto;
}

.download-link {
  text-decoration: none;
  color: #409EFF;
  cursor: pointer;
}


</style>



