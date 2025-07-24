(async () => {
  // ◀ 조정 포인트 ▶
  const clickDelay  = 300;   // 버튼 클릭 후 대기(ms)
  const scrollDelay = 1000;  // 스크롤 후 컨텐츠 로딩 대기(ms)

  const delay = ms => new Promise(r => setTimeout(r, ms));
  let total = 0;
  let lastHeight = 0;

  const RETWEET_BTN_SELECTOR = [
    'article [data-testid="unretweet"]',
    'article [aria-label="Undo Retweet"]',
    'article [aria-label="재게시 취소"]'
  ].join(',');
  const MENU_ITEM_SELECTOR  = 'div[role="menuitem"]';

  while (true) {
    // 1) 화면에 보이는 언리트윗 버튼 가져오기
    let btns = Array.from(document.querySelectorAll(RETWEET_BTN_SELECTOR));

    // 2) 버튼이 안 보이면 스크롤 내려서 로딩 대기
    if (btns.length === 0) {
      window.scrollTo(0, document.body.scrollHeight);
      await delay(scrollDelay);

      // 페이지 끝까지 내려도 새 컨텐츠가 없으면 종료
      const newHeight = document.body.scrollHeight;
      if (newHeight === lastHeight) break;
      lastHeight = newHeight;
      continue;  // 다시 selector 체크
    }

    // 3) 버튼이 보이면 하나씩 처리
    for (const btn of btns) {
      btn.click();
      await delay(clickDelay);

      const items = Array.from(document.querySelectorAll(MENU_ITEM_SELECTOR));
      const undo = items.find(el =>
        el.innerText.includes('재게시 취소') ||
        el.innerText.includes('Undo Retweet')
      );
      if (undo) {
        undo.click();
        total++;
        console.log(`✔️ ${total}번째 언리트윗 완료`);
      } else {
        // 메뉴 닫기
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      }
      await delay(clickDelay);
    }

    // 4) 처리한 뒤에도 더 아래에 버튼이 있을 수 있으니 스크롤
    window.scrollTo(0, document.body.scrollHeight);
    await delay(scrollDelay);

    // 5) 끝까지 내려도 새 컨텐츠가 없으면 루프 종료
    const newHeight = document.body.scrollHeight;
    if (newHeight === lastHeight) break;
    lastHeight = newHeight;
  }

  console.log(`🏁 완료! 총 ${total}개 언리트윗했습니다.`);
})();
