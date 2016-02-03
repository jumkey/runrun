window.onload = function() {
  // 将默认的缩放模式定义为 Nearest
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    backgroundColor: 0x000000
  });
  document.body.appendChild(renderer.view);

  // 创建舞台 Container
  var stage = new PIXI.Container();

  // 创建背景精灵
  var background = new PIXI.Sprite.fromImage('assets/img/BackDrop_01.png');
  stage.addChild(background);

  //平铺材质
  var texture = PIXI.Texture.fromImage("assets/img/characters.png");

  var players = [];
  var texts = [];
  for (var i = 0; i < 6; i++) {
    // 创建一个玩家精灵
    //var player = new PIXI.Sprite.fromImage('assets/img/player.png');
    var player = new PIXI.extras.TilingSprite(texture, 32, 32);
    players.push(player);

    player.tilePosition.x = -14 * 32;
    player.tilePosition.y = -32 * (1 + (i % 2));
    // 将中心点定在角色图片的中心
    player.anchor.set(0.5);
    // 放置在画面中间靠下的位置
    player.position.set(16, 16 + renderer.height * i / 6);
    // 设置放大倍数，因为原图很小，只有 24x24，所以需要放大一下
    player.scale.x = 2;
    player.scale.y = 2;
    // 将玩家精灵加入到舞台上
    stage.addChild(player);

    var text = new PIXI.Text('青涩的竹',{font : 'bold 12px Arial', fill : 0xff1010, align : 'center'});
    texts.push(text);
    // 将中心点定在角色图片的中心
    text.anchor.set(0.5);
    // 放置在画面中间靠下的位置
    text.position.set(16, 12 + renderer.height * i / 6);
    stage.addChild(text);
  }

  stage.interactive = true;
  stage.on("click", function(data) {
    players[0].x += 2;
    texts[0].x += 2;
    texts[0].text="赵日天";
    if (players[0].x % 1 === 0) {
      if (players[0].tilePosition.x == -17 * 32) {
        players[0].tilePosition.x = -14 * 32;
      } else {
        players[0].tilePosition.x -= 32;
      }
    }
  });
  window.onresize = function(e) {
    renderer.resize(this.innerWidth, this.innerHeight);
    background.width = renderer.width;
    background.height = renderer.height;

    for (var i = 0; i < players.length; i++) {
      // 放置在画面中间靠下的位置
      players[i].position.set(16, 16 + renderer.height * i / 6);
    }
  };
  window.onresize.apply(window);

  // 动画
  animate();

  function animate() {
    requestAnimationFrame(animate);

    // 渲染 Container
    renderer.render(stage);
  }
};
