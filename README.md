# Clean-Tweeter-X
Clean your Reposts, Posts and Likes

# 한글 안내

1. 개요
이 저장소에는 트위터 계정 정리를 위한 세 가지 스크립트가 포함되어 있습니다(DevTools Snippet 형태):
cleanLikes: 좋아요 누른 트윗을 한 번에 취소합니다.
cleanReTweets: 리트윗한 글을 모두 취소합니다.
cleanTweets: 자신이 작성한 트윗을 하나씩 삭제합니다.

2. 전제 조건
트위터에 로그인된 상태여야 합니다.
최신 브라우저(Chrome, Firefox, Edge) 및 개발자 도구 사용 가능해야 합니다.

3. 설치 및 사용 방법
3-1.개발자 도구 열기
F12 키를 누르거나, 우클릭 → 검사를 선택하여 개발자 도구를 엽니다.
3-2. Snippets 생성
상단의 Sources 탭으로 이동합니다.
좌측 패널에서 Snippets 항목을 확장합니다.
New snippet 버튼을 클릭합니다.
아래 이름으로 생성합니다:
cleanLikes
cleanReTweets
cleanTweets
각 .js 파일의 내용을 복사하여 스니펫에 붙여넣고 저장합니다.
3-3. 스니펫 실행
스니펫 이름을 우클릭 → Run 클릭,
또는 스니펫을 열고 Ctrl+Enter (macOS는 Cmd+Enter) 를 누릅니다.
3-4. 콘솔에서 진행 확인
스크립트가 자동으로 페이지를 스크롤하며 작업을 수행하고, 진행 상황을 콘솔에 출력합니다.


# English

This repository provides three Twitter cleanup scripts as DevTools Snippets:
cleanLikes: Un-likes all liked tweets on your timeline.
cleanReTweets: Undoes all your retweets.
cleanTweets: Deletes your own tweets one by one.

Prerequisites
You must be logged in to your Twitter account.

A modern browser (Chrome, Firefox, Edge) with Developer Tools.

Installation & Usage
Open Developer Tools

Press F12 (or right‑click → Inspect) to open DevTools.

Create Snippets

Switch to the Sources tab.

In the left pane, expand Snippets.

Click New snippet.

Name it exactly:

cleanLikes

cleanReTweets

cleanTweets

Copy the corresponding .js file content into each snippet and Save.

Run a Snippet

Right‑click the snippet name → Run,

or open the snippet and press Ctrl+Enter (Cmd+Enter on macOS).

Watch the Console

The script will scroll through your feed and log progress in the Console.
