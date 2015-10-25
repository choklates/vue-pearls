var Vue = require('vue');

Vue.config.debug = true;

var app = new Vue({
  el: '#app',

  data: {
    quotes: []
  },

  created: function() {
    this.getData('data.json', this.handleSuccess, this.handleError);
  },

  methods: {
    getData: function(path, success, error) {
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
    handleSuccess: function(data) {
      this.quotes = data;
    },
    handleError: function(xhr) {
      console.log(xhr);
    }
  }
});
