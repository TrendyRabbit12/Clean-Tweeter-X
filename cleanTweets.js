(async () => {
  // ◀ 조정 포인트 ▶
  const clickDelay   = 300;                    // 버튼 클릭 후 대기(ms)
  const scrollDelay  = 500;                    // 스크롤 후 대기(ms)
  const scrollStep   = window.innerHeight / 2; // 한 번에 스크롤할 픽셀

  const delay = ms => new Promise(r => setTimeout(r, ms));
  let total = 0;
  let lastHeight = 0;

  const MORE_BTN   = 'article [aria-label="더 보기"], article [aria-label="More"]';
  const MENU_ITEM  = 'div[role="menuitem"]';

  while (true) {
    // 1) 화면에 보이는 “더 보기” 버튼 검사
    let moreButtons = Array.from(document.querySelectorAll(MORE_BTN));
    console.log(`▶️ 처리 대상 “더 보기” 버튼: ${moreButtons.length}`);

    // 2) 버튼이 없으면 스크롤해서 로드 대기 → 다시 찾기
    if (moreButtons.length === 0) {
      console.log('🔍 “더 보기” 버튼이 보이지 않아 스크롤합니다.');
      let found = false;

      while (true) {
        window.scrollBy(0, scrollStep);
        await delay(scrollDelay);

        const currHeight = document.body.scrollHeight;
        if (currHeight === lastHeight) {
          console.log('🚩 페이지 끝에 도달했으나 “더 보기” 버튼을 찾지 못했습니다.');
          break;
        }
        lastHeight = currHeight;

        moreButtons = Array.from(document.querySelectorAll(MORE_BTN));
        if (moreButtons.length > 0) {
          console.log(`✅ “더 보기” 버튼 ${moreButtons.length}개 발견!`);
          found = true;
          break;
        }
      }
      if (!found) break;      // 더 이상 버튼이 없으면 종료
    }

    // 3) “더 보기” 버튼이 보이면 하나씩 클릭해 메뉴 열고 삭제
    for (const btn of moreButtons) {
      btn.click();
      await delay(clickDelay);

      // 메뉴에서 “삭제” 또는 “Delete” 항목 찾기
      const items = Array.from(document.querySelectorAll(MENU_ITEM));
      const deleteItem = items.find(el =>
        el.innerText.includes('삭제') || el.innerText.includes('Delete')
      );

      if (deleteItem) {
        deleteItem.click();
        await delay(clickDelay);

        // 확인 대화상자에서 “삭제하기” / “Delete” 버튼 찾기
        const confirmBtn = Array.from(
          document.querySelectorAll('button, div[role="button"]')
        ).find(el =>
          el.innerText.trim() === '삭제하기' ||
          el.innerText.trim() === 'Delete'
        );

        if (confirmBtn) {
          confirmBtn.click();
          total++;
          console.log(`   ✔️ ${total}번째 게시글 삭제 완료`);
        } else {
          console.warn('   ⚠️ “삭제하기” 확인 버튼을 찾지 못했습니다.');
        }
      } else {
        console.warn('   ⚠️ “삭제” 메뉴를 찾지 못했습니다. 메뉴 닫기');
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      }

      await delay(clickDelay);
    }

    // 4) 다음 배치 로드를 위해 페이지 끝까지 스크롤
    window.scrollBy(0, scrollStep);
    await delay(scrollDelay);

    // 5) 새 로드된 컨텐츠가 없으면 종료
    const currHeight = document.body.scrollHeight;
    if (currHeight === lastHeight) break;
    lastHeight = currHeight;
  }

  console.log(`🏁 전체 완료! 총 ${total}개 게시글이 삭제되었습니다.`);
})();
