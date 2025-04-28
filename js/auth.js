// アカウント作成フォーム
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = document.getElementById('signup-id').value.trim();
        const nickname = document.getElementById('signup-nickname').value.trim();
        const password = document.getElementById('signup-password').value;

        if (id.length < 5 || !/^[a-zA-Z0-9]+$/.test(id)) {
            alert('IDは英数字5文字以上で入力してください');
            return;
        }

        // 保存するデータ
        const userData = {
            id,
            nickname,
            password,
            chips: 10000 // 初期チップ
        };

        // localStorageに保存
        localStorage.setItem('user_' + id, JSON.stringify(userData));

        alert('アカウントを作成しました！ログインしてください');
        window.location.href = 'login.html';
    });
}
// ログインフォーム
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = document.getElementById('login-id').value.trim();
        const password = document.getElementById('login-password').value;

        // ユーザーデータ取得
        const userDataJson = localStorage.getItem('user_' + id);

        if (!userDataJson) {
            alert('IDが存在しません');
            return;
        }

        const userData = JSON.parse(userDataJson);

        if (userData.password !== password) {
            alert('パスワードが違います');
            return;
        }

        // ログイン成功！セッション用に保存
        localStorage.setItem('currentUser', id);

        alert('ログイン成功！');
        window.location.href = 'select-game.html';
    });
}
