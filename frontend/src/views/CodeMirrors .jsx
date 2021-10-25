
import CodeMirror from 'codemirror';//引入codeMirror
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
class CodeMirrors extends Component{
    constructor(props) {
      super(props);
        this.state= {
          FileContentData: props.FileContentData,
        }
    }
    componentDidMount(){
      const {FileContentData} = this.props
        this.initUI(FileContentData)
    }
    initUI(data) {
      var target = this.refs['react-diff-code-view'];//获取dom元素
      console.log(target)
      target.innerHTML = "";//每次dom元素的内容清空
      CodeMirror.MergeView(target, Object.assign({}, {
        readOnly: true,//只读
        lineNumbers: true, // 显示行号
           theme: 'eclipse', //设置主题
        value: data.lhContent,//左边的内容（新内容）
        orig: data.rhContent,//右边的内容（旧内容）
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
      // 智能提示
      extraKeys：{
          "Alt-/": "autocomplete", "F11": function (cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          }
        }
      }, this.props.options || {}));
    }
    render(){
      return (
        <div className="react-diff-code-view" style={{height: '100%'}}>
          <div ref="react-diff-code-view" style={{height: '100%'}</div>
        </div>
      )
    }
  }
  export default CodeMirrors;
  