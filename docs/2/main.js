

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
  var scrollP = scroll / ($(document).height() - sh);

  // 下に行くにつれ色が変わる
  $('.mv > .obj').css({
    backgroundColor:chroma.mix(0x7fb6a2, 0xc13d23, scrollP).css()
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
