require=function t(e,i,o){function n(a,c){if(!i[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[a]={exports:{}};e[a][0].call(u.exports,function(t){var i=e[a][1][t];return n(i?i:t)},u,u.exports,t,e,i,o)}return i[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)n(o[a]);return n}({Game:[function(t,e,i){"use strict";cc._RFpush(e,"52cea1c2YxOG7fVaE2W8T77","Game"),cc.Class({"extends":cc.Component,properties:{background:cc.Sprite,mapBackground:cc.Sprite,labelBackground:cc.Prefab,overView:cc.Prefab,manager:{"default":null},tiles:[],tile:cc.Prefab,tileOriginX:0,tileOriginY:0,tileSpace:10,maxNumLabel:cc.Label,describeLabel:cc.Label,score:0,scoreLabel:cc.Label,bestScore:0,bestScoreLabel:cc.Label,currentOverView:{"default":null,type:cc.Sprite},animationDuration:.1,currentMousePositionX:-1,currentMousePositionY:-1,isAnimation:!1},onLoad:function(){this.setupTiles();var t=cc.sys.localStorage.getItem("bestScore");t||(t=0),this.updateBestScore(t),this.setupMapBackground(),this.setupEventListener()},setTilePosition:function(t,e,i,o){var n=this.tileOriginX+this.tileSpace+i*(this.tileSpace+this.manager.tileSize.width),r=this.tileOriginY+this.tileSpace+e*(this.tileSpace+this.manager.tileSize.height);if(o){var a=cc.moveTo(this.animationDuration,cc.p(n,r));t.runAction(a)}else t.setPosition(n,r);t.row=e,t.col=i},setupTiles:function(){this.manager=t("Manager"),3==this.manager.order?(this.tiles=[[null,null,null],[null,null,null],[null,null,null]],this.maxNumLabel.string="1024",this.describeLabel.string="Join the numbers\nto get to 1024"):4==this.manager.order?(this.tiles=[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]],this.maxNumLabel.string="2048",this.describeLabel.string="Join the numbers\nto get to 2048"):5==this.manager.order&&(this.tiles=[[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null]],this.maxNumLabel.string="8192",this.describeLabel.string="Join the numbers\nto get to 8192")},setupMapBackground:function(){this.background.node.color=this.manager.backgroundColor(),this.mapBackground.node.color=this.manager.scoreBoardColor();var t=cc.instantiate(this.labelBackground);this.manager.tileSize.width=t.width,this.manager.tileSize.height=t.height;var e=this.manager.getRowCount(),i=this.manager.getColCount(),o=(this.manager.tileSize.width+this.tileSpace)*e+this.tileSpace,n=(this.manager.tileSize.height+this.tileSpace)*i+this.tileSpace;this.mapBackground.node.width=o,this.mapBackground.node.height=n,this.tileOriginX=-1*(o-this.manager.tileSize.width)/2,this.tileOriginY=-1*(n-this.manager.tileSize.height)/2;for(var r=0;r<e;r++)for(var a=0;a<i;a++){var c=cc.instantiate(this.labelBackground);this.setTilePosition(c,r,a,!1),this.mapBackground.node.addChild(c)}this.createRandomTile(!1),this.createRandomTile(!1)},showOverView:function(){null==this.currentOverView&&(this.currentOverView=cc.instantiate(this.overView)),this.background.node.addChild(this.currentOverView)},setupEventListener:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.mapBackground.node.on(cc.Node.EventType.TOUCH_START,function(t){var e=t.touch.getLocation();this.currentMousePositionX=e.x,this.currentMousePositionY=e.y},this);var t=function(t){var e=t.touch.getLocation(),i=e.x-this.currentMousePositionX,o=e.y-this.currentMousePositionY;Math.abs(i)>Math.abs(o)?i>0?this.actionForKeyCode(cc.KEY.right):this.actionForKeyCode(cc.KEY.left):o>0?this.actionForKeyCode(cc.KEY.up):this.actionForKeyCode(cc.KEY.down)};this.mapBackground.node.on(cc.Node.EventType.TOUCH_END,t,this),this.mapBackground.node.on(cc.Node.EventType.TOUCH_CANCEL,t,this)},onKeyUp:function(t){this.actionForKeyCode(t.keyCode)},actionForKeyCode:function(t){if(!this.isAnimation){var e=!1;switch(t){case cc.KEY.up:e=this.moveUp();break;case cc.KEY.down:e=this.moveDown();break;case cc.KEY.left:e=this.moveLeft();break;case cc.KEY.right:e=this.moveRight()}if(e){this.isAnimation=!0;var i=this.createRandomTile(!0);i||this.showOverView()}else{var o=this.checkWhetherOver();o&&this.showOverView()}}},addScore:function(t){this.score+=t,this.scoreLabel.string=this.score.toString(),this.score>this.bestScore&&this.updateBestScore(this.score)},clearScore:function(){this.score=0,this.scoreLabel.string=this.score.toString()},updateBestScore:function(t){this.bestScore=t,this.bestScoreLabel.string=this.bestScore.toString(),cc.sys.localStorage.setItem("bestScore",this.bestScore)},handleRestart:function(){this.currentOverView&&this.currentOverView.removeFromParent(),this.setupTiles(),this.setupMapBackground(),this.score=0,this.scoreLabel.string=this.score.toString()},createRandomTile:function(t){for(var e=this.manager.getRowCount(),i=this.manager.getColCount(),o=[],n=0;n<e;n++)for(var r=0;r<i;r++)null==this.tiles[n][r]&&o.push(cc.p(n,r));if(0==o.size)return!1;var a=Math.floor(Math.random()*o.length),c=o[a];if(t){var s=cc.delayTime(this.animationDuration+.1),l=cc.callFunc(this.createTileAtPosition,this,c),u=cc.callFunc(this.resetIsAnimation,this),h=cc.sequence([s,l,u]);this.node.runAction(h)}else this.createTileAtPosition(this.node,c),this.resetIsAnimation();return!0},resetIsAnimation:function(){this.isAnimation=!1},checkWhetherOver:function(){for(var t=this.manager.getRowCount(),e=this.manager.getColCount(),i=!0,o=0;o<t;o++)for(var n=0;n<e;n++){if(null==this.tiles[o][n]){i=!1;break}var r,a=this.tiles[o][n].getComponent("Tile"),c=o+1;if(c<t&&(r=this.tiles[c][n].getComponent("Tile"),r.tag==a.tag)){i=!1;break}var s=n+1;if(s<e&&(r=this.tiles[o][s].getComponent("Tile"),r.tag==a.tag)){i=!1;break}}return i},createTileAtPosition:function(t,e){var i=cc.instantiate(this.tile);this.tiles[e.x][e.y]=i,this.setTilePosition(i,e.x,e.y),this.mapBackground.node.addChild(i)},mergeTiles:function(t,e){},moveTilePosition:function(t,e,i,o,n){this.tiles[e][i]=null,this.tiles[o][n]=t,this.setTilePosition(t,o,n,!0)},moveUp:function(){var t=this.manager.getRowCount(),e=this.manager.getColCount();return this.moveVertically(e,t,function(e){return t-1-e})},moveDown:function(){var t=this.manager.getRowCount(),e=this.manager.getColCount();return this.moveVertically(e,t,function(t){return t})},moveLeft:function(){var t=this.manager.getRowCount(),e=this.manager.getColCount();return this.moveHorizontally(t,e,function(t){return t})},moveRight:function(){var t=this.manager.getRowCount(),e=this.manager.getColCount();return this.moveHorizontally(t,e,function(t){return e-1-t})},moveVertically:function(e,i,o){for(var n=!1,r=0;r<e;r++)for(var a=0,c=this.tiles[o(a)][r],s=1;s<i;s++){var l=o(s),u=this.tiles[l][r];if(null!=u)if(null!=c){var h=c.getComponent("Tile"),g=u.getComponent("Tile"),d=o(a+1);if(h.tag!=g.tag)l!=d?(this.moveTilePosition(u,l,r,d,r),a++,n=!0):a=s,c=u;else{var m=t("Manager"),p=Math.pow(m.cardinality,g.tag+1);this.addScore(p),this.moveTilePosition(u,l,r,c.row,c.col),this.tiles[c.row][c.col]=c;var f=cc.delayTime(this.animationDuration),v=cc.callFunc(this.updateTag,this,u),b=cc.sequence([f,v]);c.runAction(b),a++,c=this.tiles[o(a)][r],n=!0}}else this.moveTilePosition(u,l,r,o(a),r),c=u,n=!0}return n},moveHorizontally:function(e,i,o){for(var n=!1,r=0;r<e;r++)for(var a=0,c=this.tiles[r][o(a)],s=1;s<i;s++){var l=o(s),u=this.tiles[r][l];if(null!=u)if(null!=c){var h=c.getComponent("Tile"),g=u.getComponent("Tile"),d=o(a+1);if(h.tag!=g.tag)l!=d?(this.moveTilePosition(u,r,l,r,d),a++,n=!0):a=s,c=u;else{var m=t("Manager"),p=Math.pow(m.cardinality,g.tag+1);this.addScore(p),this.moveTilePosition(u,r,l,c.row,c.col),this.tiles[c.row][c.col]=c;var f=cc.delayTime(this.animationDuration),v=cc.callFunc(this.updateTag,this,u),b=cc.sequence([f,v]);c.runAction(b),a++,c=this.tiles[r][o(a)],n=!0}}else this.moveTilePosition(u,r,l,r,o(a)),c=u,n=!0}return n},updateTag:function(t,e){var i=t.getComponent("Tile");i.tag+=1,i.updateTag(),e.removeFromParent()}}),cc._RFpop()},{Manager:"Manager"}],Manager:[function(t,e,i){"use strict";cc._RFpush(e,"47c83nNWbBKHLx7R+Tiygke","Manager"),cc.Class({"extends":cc.Component,statics:{cardinality:2,order:4,tileSize:{width:130,height:130},backgroundColor:function(){return cc.color(250,248,239,255)},scoreBoardColor:function(){return cc.color(187,173,160,255)},socreHintColor:function(){return cc.color(235,231,227,255)},socreLabelColor:function(){return cc.color(255,255,255,255)},buttonColor:function(){return cc.color(119,110,101,255)},colorForTag:function(t){var e=cc.color(255,255,255,255);switch(t){case 0:e=cc.color(238,228,218,255);break;case 1:e=cc.color(237,224,200,255);break;case 2:e=cc.color(242,177,121,255);break;case 3:e=cc.color(245,149,99,255);break;case 4:e=cc.color(246,124,95,255);break;case 5:e=cc.color(246,94,59,255);break;case 6:e=cc.color(237,207,114,255);break;case 7:e=cc.color(237,204,97,255);break;case 8:e=cc.color(237,200,80,255);break;case 9:e=cc.color(237,197,63,255);break;case 10:e=cc.color(237,194,46,255)}return e},textColorForTag:function(t){var e=cc.color(255,255,255,255);switch(t){case 0:case 1:e=cc.color(118,109,100,255)}return e},getRowCount:function(){return this.order},getColCount:function(){return this.order}}}),cc._RFpop()},{}],ScoreBoardUI:[function(t,e,i){"use strict";cc._RFpush(e,"a6aab8B42NDdoA4LFpqn/fL","ScoreBoardUI"),cc.Class({"extends":cc.Component,properties:{boardBackground:cc.Sprite,boardHint:cc.Label,boardLabel:cc.Label},onLoad:function(){var e=t("Manager");this.boardBackground.node.color=e.scoreBoardColor(),this.boardHint.node.color=e.socreHintColor(),this.boardLabel.node.color=e.socreLabelColor()}}),cc._RFpop()},{Manager:"Manager"}],Setting:[function(t,e,i){"use strict";cc._RFpush(e,"a9457HC1rxKlKVj7VRGaaXh","Setting"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){}}),cc._RFpop()},{}],Tile:[function(t,e,i){"use strict";cc._RFpush(e,"bb0c91TruNI4KugNQ8+Qfus","Tile"),cc.Class({"extends":cc.Component,properties:{tag:0,row:0,col:0,label:{"default":null,type:cc.Label}},onLoad:function(){this.label.fontSize=50,this.setTag(0)},update:function(t){},setTag:function(t){this.tag=t,this.updateTag()},updateTag:function(){var e=t("Manager"),i=e.colorForTag(this.tag);this.node.setColor(i);var o=e.textColorForTag(this.tag);this.label.node.color=o;var n=Math.pow(e.cardinality,this.tag+1);this.label.string=n.toString()}}),cc._RFpop()},{Manager:"Manager"}]},{},["Manager","Game","ScoreBoardUI","Setting","Tile"]);