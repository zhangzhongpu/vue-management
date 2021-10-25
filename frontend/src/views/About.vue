<template>
  <div class="in-coder-panel">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入全局实例
  import _CodeMirror from 'codemirror'

  // 核心样式
  import 'codemirror/lib/codemirror.css'
  // 引入主题后还需要在 options 中指定主题才会生效
  import 'codemirror/theme/cobalt.css'

  // 需要引入具体的语法高亮库才会有对应的语法高亮效果
  // codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
  // 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/xml/xml.js'
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/mode/markdown/markdown.js'
  import 'codemirror/mode/python/python.js'
  import 'codemirror/mode/r/r.js'
  import 'codemirror/mode/shell/shell.js'
  import 'codemirror/mode/sql/sql.js'
  import 'codemirror/mode/swift/swift.js'
  import 'codemirror/mode/vue/vue.js'

  import 'codemirror/addon/merge/merge.css';//引入codeMirror样式
  import './diff_match_patch';//codeMirror的比对是依赖于google的这个插件来实现的，但是在codeMirror底层并没有这个插件，所以要自行引入，我这里是下载到了本地之后再引入的
  // 对比
  import 'codemirror/addon/merge/merge.css';
  import 'codemirror/addon/merge/merge.js';
  // mode
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/mode/xml/xml'
  import 'codemirror/mode/python/python'
  import 'codemirror/mode/markdown/markdown'
  // fold
  import "codemirror/addon/fold/foldgutter.css"
  import "codemirror/addon/fold/foldcode"
  import "codemirror/addon/fold/brace-fold"//折叠js
  import "codemirror/addon/fold/xml-fold"//折叠xml和html
  import "codemirror/addon/fold/markdown-fold"//折叠md
  import "codemirror/addon/fold/comment-fold"//折叠注释，但是测试一下只能折叠html的注释；
  // active-line
  import "codemirror/addon/selection/active-line"
  // 尝试获取全局实例
  const CodeMirror = window.CodeMirror || _CodeMirror

  export default {
    name: 'in-coder',
    props: {
      // 外部传入的内容，用于实现双向绑定
      value: String,
      // 外部传入的语法类型
      language: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        // 内部真实的内容
        code: '',
        // 默认的语法类型
        mode: 'javascript',
        // 编辑器实例
        coder: null,
        // 默认配置
        options: {
          // 缩进格式
          tabSize: 2,
          // 主题，对应主题库 JS 需要提前引入
          theme: 'cobalt',
          // 显示行号
          lineNumbers: true,
          line: true,
          readOnly: true,//只读
          lineNumbers: true, // 显示行号
          theme: 'eclipse', //设置主题
          value: '123',//左边的内容（新内容）
          orig: '32133333',//右边的内容（旧内容）
          mode: "javascript",//代码模式为js模式，这里还可以是xml，python，java，等等，会根据不同代码模式实现代码高亮
          highlightDifferences: "highlight",//有差异的地方是否高亮
          connect: null,
          revertButtons: false,//revert按钮设置为true可以回滚
          styleActiveLine: true,//光标所在的位置代码高亮
          lineWrap:true,// 文字过长时，是换行(wrap)还是滚动(scroll),默认是滚动
          smartIndent: true, // 智能缩进
          matchBrackets: true, // 括号匹配
          foldGutter:true,//代码折叠
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        },
        // 支持切换的语法高亮类型，对应 JS 已经提前引入
        // 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
      }
    },
    mounted () {
      // 初始化
      this._initialize()
    },
    methods: {
      // 初始化
      _initialize () {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
        // 编辑器赋值
        this.coder.setValue(this.value || this.code)

        // 支持双向绑定
        this.coder.on('change', (coder) => {
          this.code = coder.getValue()

          if (this.$emit) {
            this.$emit('input', this.code)
          }
        })

        // 尝试从父容器获取语法类型
        if (this.language) {
          // 获取具体的语法类型对象

          // 判断父容器传入的语法是否被支持
          if (modeObj) {
            this.mode = modeObj.label
          }
        }
      },
      // 获取当前语法类型

      // 更改模式
      changeMode (val) {
        // 修改编辑器的语法配置
        this.coder.setOption('mode', `text/${val}`)

        // 获取修改后的语法

        // 允许父容器通过以下函数监听当前的语法值
        this.$emit('language-change', label)
      }
    }
  }
</script>

<style>

</style>