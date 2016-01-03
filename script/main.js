var path = require("path");
var gui = require('nw.gui');
var util = require("util");
var Server = require("server");

var NWAPP = gui.App;

var server = new Server();
var appName = "application";
var args = NWAPP.argv;
if(args[0] && args[0] != ''){
  appName = args[0];
}
var appDir = "./" + appName;
process.cwd(appDir);
console.log("launching " + appName);
server.setApplication({DIR: "./" + appName});

var FRAME = document.querySelector("#app");

setTimeout(function(){
  activate(appName);
},1000);

  

function activate(label){
  server.start(label,function(err,url){
    if(err){
      alert(err.message);
    }else{
      FRAME.src = url;
    }
  });
}


var actionList = [
  {
    label: "reload",
    click: function(){
      FRAME.contentWindow.location.reload();
    }
  },
  {
    label: "Quit",
    click: function(){
      NWAPP.quit();
    }
  }
];
var bar = new gui.Menu({type: "menubar"});
var appMenu = new gui.Menu();
var options;

for(var i = 0;i < actionList.length;i++){
  appMenu.append(new gui.MenuItem(actionList[i]));
}

var appItem = new gui.MenuItem({label: "Control",submenu: appMenu});
bar.append(appItem);
gui.Window.get().menu = bar;
