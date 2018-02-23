

// 動かすターゲットとか入れておく
arr = [];


init();


// 初期設定
function init() {

  // ステージサイズ
  var sw = window.innerWidth;
  var sh = window.innerHeight;

  $('.obj').each(function(i,e) {

    var el = $(e);

    // 大きさ、位置ランダム
    var x = random(0, sw * 0.7);
    var y = random(0, sh * 0.7);
    TweenMax.set(el, {
      width:random(sw * 0.1, sw * 0.3),
      height:random(sh * 0.1, sh * 0.3)
    });

    // 移動の方向をバラバラに
    kakeX = 0;
    kakeY = 0;
    if(random(0, 1) > 0.5) {
      kakeX = random(-1, 1);
    } else {
      kakeY = random(-1, 1);
    }

    var o = {
      kakeX:kakeX,
      kakeY:kakeY,
      tgX:x,
      tgY:y,
      x:x,
      y:y,
      el:el
    };
    arr.push(o);

  });

  update();

}


// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  // ステージサイズ
  var sw = window.innerWidth;
  var sh = window.innerHeight;

  // スクロール位置
  var scroll = $(window).scrollTop();

  // スクロール進捗率 0 ~ 1
  var scrollP = scroll / ($(document).height() - sh);

  var len = arr.length;
  for(var i = 0; i < len; i++) {

    // 進捗率1でちょうど目標値になるようにする
    var o = arr[i];

    // イージングさせるのでまずこっちを更新
    var tgX = o.tgX + (o.kakeX * sw * (1 - scrollP));
    var tgY = o.tgY + (o.kakeY * sh * (1 - scrollP));
    o.x += (tgX - o.x) * 0.1;
    o.y += (tgY - o.y) * 0.1;

    // DOMに反映
    TweenMax.set(o.el, {
      x:o.x,
      y:o.y,
      opacity:scrollP //最初は見えないようにするため
    });

  }

  window.requestAnimationFrame(update);
}








// ----------------------------------------
// 度からラジアンに変換
// @val : 度
// ----------------------------------------
function radian(val) {
  return val * Math.PI / 180;
}

// ----------------------------------------
// ラジアンから度に変換
// @val : ラジアン
// ----------------------------------------
function degree(val) {
  return val * 180 / Math.PI;
}

// ----------------------------------------
// minからmaxまでランダム
// ----------------------------------------
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------------------------------------
// 範囲変換
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
// ----------------------------------------
function map(val, toMin, toMax, fromMin, fromMax) {
  if(val <= fromMin) {
    return toMin;
  }
  if(val >= fromMax) {
    return toMax;
  }
  p = (toMax - toMin) / (fromMax - fromMin);
  return ((val - fromMin) * p) + toMin;
}
