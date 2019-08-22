const md5 = require('md5');
let tools = {
    md5(str) {
        return md5(str)
    },
    formatDateTime (date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;   
        return y + '-' + m + '-' + d+' '+h+':'+minute;  
    },
    toTree(data) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function (item) {
            delete item.children;
        });

        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {};
        data.forEach(function (item) {
            map[item.id] = item;
        });

        var val = [];
        data.forEach(function (item) {

            // 以当前遍历项，的pid,去map对象中找到索引的id
            var parent = map[item.pid];

            // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
            if (parent) {

                (parent.children || ( parent.children = [] )).push(item);

            } else {
                //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                val.push(item);
            }
        });

        return val;
    },
   getToken(payload={}) {

     return jwt.sign(payload, secret, { expiresIn: '2h' });

  }
}

module.exports = tools;