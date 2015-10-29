var Vue = require('vue');

Vue.config.debug = true;

var app = new Vue({
  el: '#app',

  data: {
    quotes: [],
    index: 0,
    loaded: false
  },

  computed: {
    quote: function() {
      if (this.loaded) {
        return this.quotes[this.index].text;
      }
    },
    author: function() {
      if (this.loaded) {
        return this.quotes[this.index].author;
      }
    }
  },

  ready: function() {
    this._getData('data.json', this._handleSuccess, this._handleError);
  },

  methods: {
    _getRandomNum: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    _getData: function(path, success, error) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            if (success)
              success(JSON.parse(xhr.responseText));
          } else {
            if (error)
              error(xhr);
          }
        }
      };
      xhr.open("GET", path, true);
      xhr.send();
    },
    _handleSuccess: function(data) {
      this.$set('quotes', data);
      this.loaded = true;
      this.shuffle();
    },
    _handleError: function(xhr) {
      console.log(xhr);
    },
    shuffle: function() {
      this.index = this._getRandomNum(0, this.quotes.length - 1);
    },
    previous: function() {
      this.index = (this.index === 0) ? this.quotes.length - 1 : this.index - 1;
    },
    next: function() {
      this.index = (this.index === this.quotes.length - 1) ? 0 : this.index + 1;
    }
  }
});
