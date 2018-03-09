

param = {
  scroll:{x:0, y:0}
};

init();


// 初期設定
function init() {

  $(window).on('click', _eClick);

}


function _eClick(e) {

  $(window).scrollTop(random(0, $(document).height() - window.innerHeight))

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
    color:chroma.scale([0x74c9a0, 0x579df8, 0xf0afe3, 0xeb4dd3])(p).css(),
    textDecoration:['none', 'line-through'][~~(map(p, 0, 1.9, 0, 1))],
    borderStyle:['none', 'dashed', 'groove', 'dotted', 'ridge'][~~(map(p, 0, 4.9, 0, 1))],
    borderColor:chroma.scale([0x579df8, 0xf0afe3, 0xeb4dd3, 0x74c9a0])(p).css(),
    borderWidth:map(p, 0, 100, 0, 1) + 'px',
    backgroundColor:chroma.scale([0xf0afe3, 0xeb4dd3, 0x74c9a0, 0x579df8])(p).css(),
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
