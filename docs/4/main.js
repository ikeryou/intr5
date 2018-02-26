
// 動かすターゲットとか入れておく
arr = [];

init();


// 初期設定
function init() {

  $('.text span').each(function(i,e) {

    var el = $(e);

    // 動きをバラバラに
    var kake = 1;
    if(i % 2 == 0) {
      kake *= -1;
    }

    var o = {
      kake:kake,
      p:0,
      el:el
    };
    arr.push(o);

  });

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

  // 全体の背景色
  TweenMax.set($('.mv'), {
    backgroundColor:chroma.mix(0x1b2920, 0xffffff, scrollP).css()
  });

  var len = arr.length;
  for(var i = 0; i < len; i++) {

    var o = arr[i];

    // スクロール進捗率を順番に分配してく
    var size = 1 / len;
    var offset = 0.8; // ちょっと食い気味に入ってくるように
    var p = map(scrollP, 0, 1, size * offset * i, size * i + size);

    // 複数動かしたいから、こいつをイージング
    o.p += (p - o.p) * 0.1;

    // 位置
    var y = o.kake * sh * 0.5 * (1 - o.p);

    // 角度
    var rotX = o.kake * 90 * (1 - o.p);
    var rotY = o.kake * 360 * (1 - o.p);
    var rotZ = o.kake * 60 * (1 - o.p);

    // スケール
    var scale = map(o.p, 3, 1, 0, 1);

    // DOMに反映
    TweenMax.set(o.el, {
      rotationX:rotX,
      rotationY:rotY,
      rotationZ:rotZ,
      scale:scale,
      y:y,
      opacity:o.p,
      color:chroma.mix(0x1b2b21, 0xb93133, o.p).css() // 色
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
