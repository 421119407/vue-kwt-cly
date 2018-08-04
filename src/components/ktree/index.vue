<template>
  <ul class="ul-ktree">
    <li v-for="(item,index) in treeDatas"
        :key="item.id"
        :class="{leaf:isLeaf(item),'first-node': index === 0 && !isLeaf(item),'only-node': treeDatas.length === 1 && !isLeaf(item)}"
        v-show="item.hasOwnProperty('visible') ? item.visible : true">
      <div class="ktree-node">
        <span @click="expandNode(item)" v-if="!item.parent || item.children && item.children.length>0" :class="item.expanded ? 'tree-open':'tree-close'"></span>
        <span v-if="checkModel" :class="[item.checked ? (item.halfCheck ? 'box-halfchecked' : 'box-checked') : 'box-unchecked','inputCheck']">
            <input :disabled="item.chkDisabled"
                   :class="['check', item.chkDisabled ? 'chkDisabled' : '']"
                   type="checkbox"
                   @change="changeNodeCheckStatus(item, $event)"
                   v-model="item.checked"/>
        </span>
        <span :class="bzStyle"></span>
        <Render :node="item" :template ='tpl'/>
      </div>
      <transition name="expand" mode="out-in">
        <k-tree v-if="!isLeaf(item)"
                :datas="item.children"
                @node-check='nodeCheck'
                @on-click="onClick"
                @node-single-check = 'nodeCheck'
                :parent="item"
                :depth="childDepth+1"
                :tpl ="tpl"
                v-show="item.expanded"
                :checkModel="checkModel"
                :halfCheck="halfCheck"
                :scoped="scoped">
        </k-tree>
      </transition>
    </li>
  </ul>
</template>

<script>
  import Render from './render'
  import iconStyle from './iconStyle'
export default {
    name: 'k-tree',
    components: { Render },
    data() {
      return {
        treeDatas: [],
        childDepth: this.depth,
        bzStyle: ''
      }
    },
    props: {
      iconStyle: {
        type: String,
        default: iconStyle.METRO
      },
      depth: {
        type: Number,
        default: 1
      },
      opinions: {
        type: Object,
        default: () => null
      },
      datas: {
        type: Array,
        default: () => []
      },
      parent: {
        type: Object,
        default: () => null
      },
      halfCheck: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: true
      },
      checkModel: {
        type: Boolean,
        default: true
      },
      draggable: {
        type: Boolean,
        default: false
      },
      drapAfterExpand: {
        type: Boolean,
        default: false
      },
      showCheck: {
        type: Boolean,
        default: false
      },
      isAddOrEdit: {
        type: Boolean,
        default: false
      },
      scoped: {
        type: Boolean,
        default: false
      },
      tpl: Function
    },
    created() {
      if (this.depth === 1) {
        this.treeDatas = this.initDatas()
        return
      }
      this.treeDatas = this.datas
    },
    mounted() {
      this.$on('childChecked', (node, checked) => {
        if (node.children && node.children.length) {
          for (const child of node.children) {
            this.$set(child, 'checked', checked)
            this.$emit('node-check', child, checked)
          }
        }
      })

      this.$on('parentChecked', (node, checked) => {
        this.$set(node, 'checked', checked)
        if (!node.parent) return false
        const someChildNodeChecked = node.parent.children.some(node => node.checked)
        const everyChildNodeChecked = node.parent.children.every(node => node.checked)
        if (this.halfCheck) {
          everyChildNodeChecked ? this.$set(node.parent, 'halfCheck', false) : someChildNodeChecked ? this.$set(node.parent, 'halfCheck', true) : this.$set(node.parent, 'halfCheck', false)
          if (!checked && someChildNodeChecked) {
            this.$set(node.parent, 'halfCheck', true)
            return false
          }
          this.$emit('parentChecked', node.parent, checked)
        } else {
          if (checked && everyChildNodeChecked) this.$emit('parentChecked', node.parent, checked)
          if (!checked) this.$emit('parentChecked', node.parent, checked)
        }
      })

      this.$on('node-check', (node, checked) => {
        if (!this.scoped) {
          this.$emit('parentChecked', node, checked)
          this.$emit('childChecked', node, checked)
        } else {
          this.$set(node, 'checked', checked)
        }
      })

      this.$on('cancelSelected', (root) => {
        for (let child of root.$children) {
          for (let node of child.datas) {
            child.$set(node, 'selected', false)
          }
          if (child.$children) child.$emit('cancelSelected', child)
        }
      })
      this.initHandle()
    },
    methods: {
      isLeaf(node) {
        return !(node.children && node.children.length > 0) && node.parent
      },
      changeNodeCheckStatus(node, $event) {
        this.$emit('node-check', node, $event.target.checked)
        this.$emit('node-single-check', node, $event.target.checked)
      },
      nodeCheck(node, checked) {
        this.$emit('node-check', node, checked)
      },
      onClick(node) {
        this.$emit('on-click', node)
      },
      nodeClick(node) {
        this.$emit('node-click', node)
      },
      expandNode(node) {
        this.$set(node, 'expanded', !node.expanded)
      },

      nodeMouseOver(node) {
        this.$emit('node-mouse-over', node)
      },

      nodeSelected(node) {
        const getRoot = (el) => {
          if (el.$parent.$el.nodeName === 'UL') {
            el = el.$parent
            return getRoot(el)
          } return el
        }
        let root = getRoot(this)
        for (let n of root.datas || []) {
          this.$set(n, 'selected', false)
        }
        this.$emit('cancelSelected', root)
        this.$emit('on-click', node)
        this.$set(node, 'selected', !node.selected)
      },
      initDatas() {
        let dataArray = []
        let pidArray = []
        for (let key of this.datas) {
          pidArray.push(key[this.opinions.id])
        }
        for (let key of this.datas) {
          if (pidArray.indexOf(key[this.opinions.pid]) === -1) {
            dataArray.push({
              id: key[this.opinions.id],
              name: key[this.opinions.name],
              checked: key.checked,
              visible: key.visible
            })
          }
        }
        return this.initArrayDatas(dataArray)
      },
      initArrayDatas(dataArray) {
        for (let key of dataArray) {
          let childDatas = []
          for (let k of this.datas) {
            if (key.id === k[this.opinions.pid]) {
              childDatas.push({
                id: k[this.opinions.id],
                name: k[this.opinions.name],
                pid: k[this.opinions.pid],
                checked: k.checked,
                visible: k.visible
              })
            }
          }
          key.children = childDatas
          if (childDatas.length > 0) {
            this.initArrayDatas(childDatas)
          }
        }
        return dataArray
      },
      getNodes(opt, data, isOriginal) {
        data = data || this.datas
        let res = []
        for (const node of data) {
          for (const [key, value] of Object.entries(opt)) {
            if (node[key === value]) {
              if (isOriginal) {
                res.push(node)
              } else {
                let n = Object.assign({}, node)
                delete n['children']
                delete n['parent']
                res.push(n)
              }
            }
          }
          if (node.children && node.children.length) {
            res = res.concat(this.getNodes(opt, node.children, isOriginal))
          }
        }
        return res
      },
      getSelectNodes(isOriginal) {
        return this.getNodes({ select: true }, this.data, isOriginal)
      },
      getCheckedNodes(isOriginal) {
        return this.getNodes({ checked: true }, this.data, isOriginal)
      },
      changeStyle() {
        switch (this.iconStyle) {
          case 'metroStyle':
            return '.ztree li span.button.chk.checkbox_false_part'
          case 'ztreeStyle':
            return '.ztree li span.button.chk.checkbox_false_full'
          default:
            throw new Error('Undefined style')
        }
      },
      initHandle() {
        for (const node of this.treeDatas) {
          this.$set(node, 'parent', this.parent)
        }
      }
    },
    watch: {
      depth() {
        this.childDepth = this.depth
      },
      iconStyle() {
        console.log(this.iconStyle)
        switch (this.iconStyle) {
          case 'metroStyle':
            this.bzStyle = '.ztree li span.button.chk.checkbox_false_part'
            break
          case 'ztreeStyle':
            this.bzStyle = '.ztree li span.button.chk.checkbox_false_full'
            break
          default:
            throw new Error('Undefined style')
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/ktree.scss";
  @import "../../style/zTreeStyle/zTreeStyle.css";
  @import "../../style/metroStyle/metroStyle.css";
  .expand-enter-active {
    height: 50px;
  }

  .expand-enter-active, .expand-leave-active {
    transition: all .2s;
    overflow: hidden
  }

  .expand-leave-active {
    height: 0px;
  }

  .expand-enter {
    height: 0;
    opacity: 0
  }
  .expand-leave {
    height: 50px;
    opacity: 1
  }
</style>
