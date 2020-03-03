  /* 
  封装socket.io,为了获取server以便监听. 
  2016年8月8日10:28:24 
  */  
 var socketio = {};  
 var socket_io = require('socket.io');  

 //获取io  
 socketio.getSocketio = function(server){  

 var io = socket_io.listen(server);  
   io.sockets.on('connection', function (socket) {  
     console.log('连接成功');
     socket.on('otherEvent', (data) => {  
     console.log(data);  
     io.sockets.emit("news",data);
     })  
   })  
 };  
module.exports = socketio;  