document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const action = prompt("メニューを選んでください:\n1: ゲーム選択に戻る\n2: ログアウト");

            if (action === '1') {
                window.location.href = 'select-game.html';
            } else if (action === '2') {
                localStorage.removeItem('currentUser');
                alert('ログアウトしました');
                window.location.href = 'login.html';
            }
        });
    }
});
