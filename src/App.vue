<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

import Quill from 'quill'

// 由于 QuillBetterTable 未导出内部格式，因此无法通过重写的方式修改内部方法，需要修改源码
import QuillBetterTable from './quill-better-table/quill-better-table'

// 导入 ListItem
import ListItem from './formats/list'

Quill.register({
  'modules/better-table': QuillBetterTable,
  
  // 注册 ListItem
  'formats/list': ListItem,
}, true)

let quill

onMounted(() => {
  quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      table: false,
      'better-table': {
        operationMenu: {
          items: {
            unmergeCells: {
              text: 'Another unmerge cells name'
            }
          }
        }
      },
    },
  })
})

const insertTable = () => {
  const tableModule = quill.getModule('better-table')
  tableModule.insertTable(3, 3)
}
</script>

<template>
<div>
  <button @click="insertTable" style="margin-bottom: 20px">insertTable</button>
  <div id="editor"></div>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" /> -->
</div>
</template>

<style>
@import 'quill/dist/quill.snow.css';
@import 'quill-better-table/dist/quill-better-table.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
