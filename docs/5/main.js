

param = {
  scroll:{x:0, y:0}
};

init();


// 初期設定
function init() {
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
  var p = scroll / ($(document).height() - sh);

  // サインカーブ使って0~1をループさせる
  var loop = 50;
  p = map(p, 270, 360 * loop + 270, 0, 1);
  p = map(Math.sin(radian(p)), 0, 1, -1, 1);

  $('.mv_tg').css({
    color:chroma.scale([0x000000, 0xff0000, 0x00ff00, 0x0000ff])(p).css(),
    textDecoration:['none', 'line-through'][~~(map(p, 0, 1.9, 0, 1))],
    borderBottomStyle:['none', 'dashed', 'groove', 'dotted', 'ridge'][~~(map(p, 0, 4.9, 0, 1))],
    borderBottomColor:chroma.scale([0x00ff00, 0x0000ff, 0x000000, 0xff0000])(p).css(),
    borderBottomWidth:map(p, 0, 30, 0, 1) + 'px',
    // borderStyle:['none', 'dashed', 'groove', 'dotted', 'ridge'][~~(map(p, 0, 4.9, 0, 1))],
    // borderColor:chroma.scale([0x00ff00, 0x0000ff, 0x000000, 0xff0000])(p).css(),
    // borderWidth:map(p, 0, 10, 0, 1) + 'px',
    backgroundColor:chroma.scale([0xff0000, 0x00ff00, 0x0000ff, 0x000000])(p).css(),
  });

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
