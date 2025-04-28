// ログインチェック
const currentUserId = localStorage.getItem('currentUser');
if (!currentUserId) {
    alert('ログインしてください');
    window.location.href = 'login.html';
}

// ユーザー情報取得
const userData = JSON.parse(localStorage.getItem('user_' + currentUserId));
document.getElementById('nickname').textContent = userData.nickname;
document.getElementById('chips').textContent = userData.chips;

// ゲームロジック
let dealerCards = [];
let playerCards = [];

function getRandomCard() {
    const card = Math.floor(Math.random() * 11) + 1; // 1〜11
    return card;
}

function updateHands() {
    document.getElementById('dealer-cards').textContent = dealerCards.join(' , ');
    document.getElementById('player-cards').textContent = playerCards.join(' , ');
}

function calculateTotal(cards) {
    return cards.reduce((a, b) => a + b, 0);
}

function startGame() {
    dealerCards = [getRandomCard(), getRandomCard()];
    playerCards = [getRandomCard(), getRandomCard()];
    updateHands();
    document.getElementById('message').textContent = '';
    document.getElementById('restart-btn').style.display = 'none';
}

function endGame(result) {
    const message = document.getElementById('message');
    if (result === 'win') {
        message.textContent = 'あなたの勝ち！+1000チップ';
        userData.chips += 1000;
    } else if (result === 'lose') {
        message.textContent = 'あなたの負け...-1000チップ';
        userData.chips -= 1000;
    } else {
        message.textContent = '引き分け！';
    }

    // 0チップ以下なら5000チップ配布
    if (userData.chips <= 0) {
        alert('チップがなくなったので5000チップ配布します！');
        userData.chips = 5000;
    }

    // 保存して表示更新
    localStorage.setItem('user_' + currentUserId, JSON.stringify(userData));
    document.getElementById('chips').textContent = userData.chips;

    document.getElementById('restart-btn').style.display = 'block';
}

// ボタン処理
document.getElementById('hit-btn').addEventListener('click', function() {
    playerCards.push(getRandomCard());
    updateHands();

    if (calculateTotal(playerCards) > 21) {
        endGame('lose');
    }
});

document.getElementById('stand-btn').addEventListener('click', function() {
    while (calculateTotal(dealerCards) < 17) {
        dealerCards.push(getRandomCard());
    }
    updateHands();

    const playerTotal = calculateTotal(playerCards);
    const dealerTotal = calculateTotal(dealerCards);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
        endGame('win');
    } else if (playerTotal < dealerTotal) {
        endGame('lose');
    } else {
        endGame('draw');
    }
});

document.getElementById('restart-btn').addEventListener('click', function() {
    startGame();
});

document.getElementById('menu-btn').addEventListener('click', function() {
    alert('メニューはあとで追加します！');
});

// 最初スタート
startGame();
