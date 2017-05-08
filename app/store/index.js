import { EventEmitter } from 'events'
import Firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "..."
};

let app = Firebase.initializeApp(config)
let db = app.database()
let categoriesRef = db.ref('categories')
let bookmarksRef = db.ref('bookmarks')
let store = new EventEmitter()

let categories = {}
let bookmarks = {}

categoriesRef.on('value', (snapshot) => {
  categories = snapshot.val()
  store.emit('data-updated', categories, bookmarks)
})

bookmarksRef.on('value', (snapshot) => {
  bookmarks = snapshot.val()
  store.emit('data-updated', categories, bookmarks)
})

store.addCategory = (category) => {
  categoriesRef.update(category)
}

store.deleteCategory = (catName) => {
  // first check if an 'Uncategorized' category exists, if not, create it
  if (!('Uncategorized' in categories)) {
    categoriesRef.update({'Uncategorized': 'white'})
  }

  for (var key in bookmarks) {
    if (bookmarks[key].category === catName) {
      bookmarksRef.child(key).update({category: 'Uncategorized'})
    }
  }
  categoriesRef.child(catName).remove()
}

store.addBookmark = (bookmark) => {
  bookmarksRef.push(bookmark)
}

store.deleteBookmark = (bookmarkId) => {
  bookmarksRef.child(bookmarkId).remove()
}

export default store
