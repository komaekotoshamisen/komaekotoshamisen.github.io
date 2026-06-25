// スクロールアニメーション
// ビューポート外の要素だけ anim-start で非表示にし、スクロールで is-visible を付与
document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('[data-anim]');
  if (!els.length || !('IntersectionObserver' in window)) return;

  function inView(el) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px' });

  els.forEach(function (el) {
    if (!inView(el)) {
      el.classList.add('anim-start'); // 非表示にしてスクロールで表示
      obs.observe(el);
    }
    // ビューポート内の要素は何もしない → そのまま表示
  });
});

// 共通ナビゲーション
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
// スクロールでナビ背景を濃く
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('nav.global-nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // メニュー外クリックで閉じる
  document.addEventListener('click', function (e) {
    var nav = document.getElementById('navLinks');
    var btn = document.getElementById('hamburger');
    if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
  // 現在ページのナビをアクティブに（フォルダ単位で厳密に判定）
  var segs = location.pathname.split('/').filter(Boolean);
  var currentFolder = segs.length >= 2 ? segs[segs.length - 2] : '';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var hrefSegs = a.getAttribute('href').replace('../', '').replace('./', '').split('/').filter(Boolean);
    var hrefFolder = hrefSegs.length > 1 ? hrefSegs[0] : '';
    if (hrefFolder && hrefFolder === currentFolder) {
      a.classList.add('active');
    }
  });
});
