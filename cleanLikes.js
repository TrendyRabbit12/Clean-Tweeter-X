(async function cleanLikesByScroll() {
  const clickDelay   = 300;               // 클릭 간 대기(ms)
  const scrollDelay  = 500;               // 스크롤 후 대기(ms)
  const scrollStep   = window.innerHeight / 2;  // 한 번에 스크롤할 픽셀
  const processed    = new Set();         // 이미 클릭한 path 저장
  let lastScrollTop = -1;

  while (true) {
    // 1) 화면에 보이는 빨간 하트(path)를 모두 찾는다
    const redPaths = Array.from(document.querySelectorAll('svg path'))
      .filter(path => {
        // 1-1) 채워진(fill) 색상 필터: rgb(249,24,128) 또는 #f91880
        const styleFill = getComputedStyle(path).fill;
        const attrFill  = path.getAttribute('fill');
        if (!(
          styleFill === 'rgb(249, 24, 128)' ||
          styleFill === 'rgba(249, 24, 128, 1)' ||
          attrFill  === 'rgb(249,24,128)' ||
          attrFill  === '#f91880'
        )) return false;

        // 1-2) 요소가 현재 뷰포트 안에 있는지 검사
        const rect = path.getBoundingClientRect();
        return rect.top    >= 0 &&
               rect.bottom <= window.innerHeight;
      });

    // 2) 화면에 보이는 하트 중 아직 처리 안 된 것만 클릭
    for (const path of redPaths) {
      if (processed.has(path)) continue;
      const btn = path.closest('div[role="button"], button');
      if (!btn) continue;
      btn.click();
      processed.add(path);
      console.log(`❤️ 취소 클릭 #${processed.size}`);
      await new Promise(res => setTimeout(res, clickDelay));
    }

    // 3) 다음 화면으로 스크롤
    window.scrollBy(0, scrollStep);
    await new Promise(res => setTimeout(res, scrollDelay));

    // 4) 스크롤 위치가 변하지 않았다면(끝에 다다랐으면) 종료
    const scrollTop = window.scrollY;
    if (scrollTop === lastScrollTop) {
      console.log(`🏁 완료! 총 ${processed.size}개 클릭 시도했습니다.`);
      break;
    }
    lastScrollTop = scrollTop;
  }
})();
