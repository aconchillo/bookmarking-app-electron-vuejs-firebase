<template>
  <div id="app">
    <sidebar
      :categories="categories"
      v-on:category-selected="setSelectedCategory">
      <!-- bind 'selected-category event to the event handler setSelectedCategory' -->
    </sidebar>
    <bookmark-list
      :bookmarks="filteredBookmarks()"
      :categories="categories">
    </bookmark-list>
  </div>
</template>

<script>
  import store from './store'
  import Sidebar from './components/Sidebar.vue'
  import BookmarkList from './components/BookmarkList.vue'
  import { filterByCategory } from './filters'

  export default {

    components: {
      Sidebar,
      BookmarkList
    },

    data () {
      return {
        categories: {},
        bookmarks: {},
        selectedCategory: ''
      }
    },

    filters: {
      filterByCategory
    },

    created () {
      store.on('data-updated', this.updateListings)
    },

    methods: {
      updateListings (categories, bookmarks) {
        this.categories = categories
        this.bookmarks = bookmarks
      },

      setSelectedCategory (category) {
        this.selectedCategory = category;
      },

      filteredBookmarks () {
        return filterByCategory(this.bookmarks, this.selectedCategory);
      },

    }

  }
</script>
