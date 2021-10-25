<template>
  <div>
    <el-table :data="tableData" @selection-change="selectChange" :header-cell-style="headerSty">
      <el-table-column v-if="isExpand" type="expand">
        <slot name="expend" :row="scope.row"></slot>
      </el-table-column>
      <el-table-column v-if="isIndex" type="index" label="序号" align="center"/>
      <el-table-column v-if="isSelect" type="selection"/>
      <template v-for="(col, index) in columns">
        <el-table-column v-if="col.slot" :key="index" :label="col.label" :prop="col.field" :align="col.align" :width="col.width">
          <template v-slot="scope">
            <slot :name="col.slot" :row="scope.row"></slot>
          </template>          
        </el-table-column>
        <el-table-column v-else-if="col.formatter" :key="index" :label="col.label" :prop="col.field" :align="col.align" :width="col.width" :formatter="col.formatter"></el-table-column>
        <el-table-column v-else :key="index" :label="col.label" :prop="col.field" :align="col.align" :width="col.width" :formatter="col.formatter">
          <template v-slot="scope">
            <el-popover v-if="scope.row[col.field] && scope.row[col.field].lenght > 10" placement="bottom" trigger="hover" width :content="scope.row[col.field]">
              <span slot="reference">{{ scope.row[col.field] | reduce }}</span>
            </el-popover>
            <span v-else>{{ scope.row[col.field] | reduce }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination background :total="total" :current-page.sync="pageNum" :page-size="pageSize" :page-sizes="[5, 10, 20, 50]" @size-change="load" @current-change="load" layout="total, sizes, prev, pager, next, jumper">

    </el-pagination>
  </div>
</template>

<script>
import {httpGet} from '../utils/commonUtil'
export default {
  name: 'seanTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    psize: {
      type: Number,
      default: 10
    },
    url: {
      type: String,
      required: true
    },
    sparam: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isIndex: {
      type: Boolean,
      required: false
    },
    isSelect: {
      type: Boolean,
      required: false
    },
    isExpand: {
      type: Boolean,
      required: false
    },
  },
  data() {
    return {
      tableData: [],
      pageNum: 0,
      total: 0,
      pageSize: 5
    }
  },
  computed: {
    headerSty() {
      return {'text-align': 'center', 'background': '#f5f7fa', 'font-size': '12px'}
    }
  },
  watch: {
    sparam: {
      handler: function() {
        this.load()
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    load() {
      let param = Object.assign(this.sparam, {
        page: this.pageNum,
        size: this.pageSize
      })
      httpGet(this.url, param).then((resp)=>{
        // this.tableData = resp.recordSet
        // this.total = resp.totalCound
      }).catch(()=>{
        this.tableData = [{
          xm:'123'
        }]
        this.total = 20        
      })
    },
    selectChange(slt) {
      let idList = slt.map(item => item.id)
      this.$emit('selectionChange', idList)
    }
  },
  mounted() {
    this.pageSize = this.psize
  }
}
</script>

<style scoped lang="scss">

</style>