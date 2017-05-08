<template>
  <div @click="openLink" class="item">
    <div class="content">
      <i @click.stop="deleteBookmark" class="icon remove right-float"></i>
      <a class="header">{{title}}</a>
      <div class="description">
        {{url}}
        <a :class="'ui tiny label right-float ' + categoryColor">{{category}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { shell } from 'electron'
  import store from '../store'

  export default {
    props: ['id', 'title', 'url', 'category', 'categoryColor'],

    methods: {
      deleteBookmark () {
        store.deleteBookmark(this.id)
      },

      openLink () {
        shell.openExternal(this.url)
      }
    }

  }
</script>
