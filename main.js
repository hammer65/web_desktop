var path = require("path");
var util = require("util");
var Server = require("server");
var fs = require("fs");
var gui;
var server;

exports.init = function(g){
  gui = g;
  var NWAPP = gui.App;

  server = new Server();
  var appName = "application";
  var args = NWAPP.argv;
  if(args[0] && args[0] != ''){
    appName = args[0];
  }
  var appConfig = {};

  var config = fs.readFile("applications.json", 'utf8',function(err,data){
    if(err){
      console.log(e);
    }else if(data == ''){
      console.log("applications.json is empty");
      return;
    }
    var appDir = process.cwd() + '/' + appName;

    config = JSON.parse(data);
    if(config[appName] && fs.lstatSync(appDir).isDirectory()){
      server.setApplication({DIR: "./" + appName});
      var actionList = [
        {
          label: "Reload",
          click: function(){
            window.location.reload();
          }
        },
        {
          label: "Back",
          click: function(){
            window.history.go(-1);
          }
        },
        {
          label: "Forward",
          click: function(){
            window.history.go(1);
          }
        },
        {
          label: "Quit",
          click: function(){
            process.exit();
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

      setTimeout(function(){
        activate(appName);
      },1000);
    }else{
      console.log("No such application");
    }    
  });
}

function activate(label){
    server.start(label,function(err,url){
      if(err){
        alert(err.message);
      }else{
        window.location = url;
      }
    });
  }