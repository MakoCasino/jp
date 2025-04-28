// 現在のログインユーザーを取得
const currentUserId = localStorage.getItem('currentUser');

if (!currentUserId) {
    alert('ログインしてください');
    window.location.href = 'login.html';
}

// ユーザー情報を取得
const userDataJson = localStorage.getItem('user_' + currentUserId);
const userData = JSON.parse(userDataJson);

// ニックネームとチップ数を表示
document.getElementById('nickname').textContent = userData.nickname;
document.getElementById('chips').textContent = userData.chips;

// ランキング表示
const rankingList = document.getElementById('ranking-list');
const allUsers = [];
for (let key in localStorage) {
    if (key.startsWith('user_')) {
        const user = JSON.parse(localStorage.getItem(key));
        allUsers.push(user);
    }
}

// チップ多い順に並べる
allUsers.sort((a, b) => b.chips - a.chips);

// 上位3人を表示
for (let i = 0; i < Math.min(3, allUsers.length); i++) {
    const li = document.createElement('li');
    li.textContent = `${allUsers[i].nickname}：${allUsers[i].chips}チップ`;
    rankingList.appendChild(li);
}

// メニューボタン動作（今は仮）
document.getElementById('menu-btn').addEventListener('click', function() {
    alert('メニューはこれから作る予定です！');
});
