<template>
 <div>
   <k-tree :datas="treeDatas1" :opinions="opinions" @on-click="onClick"></k-tree>
 </div>
</template>

<script>
    import KTree from '../../components/ktree/index'

export default {
      components: { KTree },
      name: 'Sale',
      data() {
        return {
          opinions: {
            id: '_code',
            pid: '_parentCode',
            name: 'name'
          },
          treeDatas: [
            {
              id: '0000',
              name: '根节点',
              checked: false,
              parentId: null,
              visible: true,
              children: [
                {
                  id: '00000001',
                  name: '二级节点-1',
                  checked: false,
                  parentId: '0000',
                  visible: true
                },
                {
                  name: '二级节点-2',
                  checked: false,
                  id: '00000002',
                  parentId: '0000',
                  visible: true,
                  children: [
                    {
                      id: '000000020001',
                      parentId: '00000002',
                      name: '三级节点-1',
                      visible: true,
                      checked: false
                    },
                    {
                      id: '000000020002',
                      name: '三级节点-2',
                      parentId: '00000002',
                      visible: true,
                      checked: false
                    }
                  ]
                }
              ]
            }
          ],
          treeDatas1: [
            {
              _code: '01',
              _parentCode: null,
              name: '根节点',
              checked: false,
              visible: true
            },
            {
              _code: '0001',
              _parentCode: '01',
              name: '二级节点-1',
              checked: false,
              visible: true
            },
            {
              _code: '0002',
              _parentCode: '01',
              name: '二级节点-2',
              checked: false,
              visible: true
            },
            {
              _code: '00010001',
              _parentCode: '0001',
              name: '三级级节点-1',
              checked: false,
              visible: true
            },
            {
              _code: '00010002',
              _parentCode: '0001',
              name: '三级级节点-2',
              checked: false,
              visible: true
            },
            {
              _code: '00020001',
              _parentCode: '0002',
              name: '三级级节点-1',
              checked: false,
              visible: true
            }
          ]
        }
      },
      methods: {
        onClick(node) {
          console.log(node)
        }
      }
}
</script>

<style scoped>

</style>
