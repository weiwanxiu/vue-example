/**
 * app.js
 * @author Perlou(perloukevin@gmail.com)
 */

'use strict';

// vue 提交记录接口地址
// var api = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=';
var api = 'https://api.github.com/repos/Perlou/vue-example/commits?per_page=3&sha=';

// 实例化 Vue
var app = new Vue({

    el: '#app',

    data: {
        branches: ['master'],
        currentBranch: 'master',
        commits: null
    },

    created: function () {
        this.fetchData();
    },

    watch: {
        currentBranch: 'fetchData'
    },

    filters: {
        truncate: function (v) {
            console.log(v);
            var newLine = v.indexOf('\n');
            return newLine > 0 ? v.slice(0, newLine) : v
        },
        formatDate: function (v) {
            return v.replace(/T|Z/g, ' ');
        }
    },

    methods: {
        fetchData: function () {
            var xhr = new XMLHttpRequest(),
                _this = this;

            xhr.open('GET', api + _this.currentBranch);
            xhr.onload = function () {
                _this.commits = JSON.parse(xhr.responseText);
                console.log(_this.commits[0].html_url)
            };
            xhr.send();
        }
    }
});