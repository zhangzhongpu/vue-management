<template>
  <div class="tableDome">
    111
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
    }
  }
}
</script>
