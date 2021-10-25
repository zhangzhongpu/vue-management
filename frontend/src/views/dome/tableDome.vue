<template>
  <div class="tableDome">
    <div>
      <el-form :label-position="labelPosition" label-width="80px" :model="searchParam">
        <el-form-item label="名称">
          <el-input v-model="searchParam.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="searchParam.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="searchParam.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">查詢</el-button>
          <el-button @click="clear()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Table url="/123/" :columns="columns" :sparam="sparam" isIndex>
      <template #operate="{row}">
        <el-tooltip effect="dark" content="修改" placement="bottom" @click="detail(row)">
          <el-button type="text">
            <i class="el-icon-edit"></i>
          </el-button>
        </el-tooltip>
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue'

export default {
  name: 'tableDome',
  components: {
    Table
  },
  data() {
    return {
      labelPosition: 'right',
      searchParam: {
        name: '',
        region: '',
        type: ''
      },
      sparam: {},
      columns: [
        {
          label: 'xm',
          field: 'xm',
          align: 'center'
        },
        {
          label: '操作',
          align: 'center',
          slot: 'operate'
        },
      ]
    }
  },
  methods: {
    detail(row) {
      console.log(row)
    },
    search() {
      let param = Object.assign({}, this.searchParam)
      this.sparam = param
    },
    clear() {
      this.searchParam = {}
      this.sparam = {}
    }
  }
}
</script>
