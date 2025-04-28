// ログインチェック
const currentUserId = localStorage.getItem('currentUser');
if (!currentUserId) {
    alert('ログインしてください');
    window.location.href = 'login.html';
}

const userData = JSON.parse(localStorage.getItem('user_' + currentUserId));
document.getElementById('nickname').textContent = userData.nickname;
document.getElementById('chips').textContent = userData.chips;

let dealerCards = [];
let playerCards = [];
let currentBet = 0;

// カードデータ（スートと番号）
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

function getRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    return { suit, number };
}

function cardValue(card) {
    if (card.number === 'J' || card.number === 'Q' || card.number === 'K') {
        return 10;
    } else if (card.number === 'A') {
        return 11; // Aは最初11で数える
    } else {
        return card.number;
    }
}

function displayCards(cards, elementId) {
    const area = document.getElementById(elementId);
    area.innerHTML = '';
    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = `cards/${card.suit}_${card.number}.png`;
        img.alt = `${card.number} of ${card.suit}`;
        img.className = 'card';
        area.appendChild(img);
    });
}

function calculateTotal(cards) {
    let total = 0;
    let aces = 0;
    cards.forEach(card => {
        total += cardValue(card);
        if (card.number === 'A') aces++;
    });

    // Aを1に変えてバースト防止
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return total;
}

function startGame() {
    dealerCards = [getRandomCard(), getRandomCard()];
    playerCards = [getRandomCard(), getRandomCard()];
    updateHands();
    document.getElementById('message').textContent = '';
    document.getElementById('restart-btn').style.display = 'none';
}

function updateHands() {
    displayCards(dealerCards, 'dealer-cards');
    displayCards(playerCards, 'player-cards');
}

function endGame(result) {
    const message = document.getElementById('message');
    if (result === 'win') {
        message.textContent = 'あなたの勝ち！+' + (currentBet * 2) + 'チップ';
        userData.chips += currentBet * 2;
    } else if (result === 'lose') {
        message.textContent = 'あなたの負け...';
        // チップは減っているので増減なし
    } else {
        message.textContent = '引き分け！ベット額戻ります！';
        userData.chips += currentBet;
    }

    if (userData.chips <= 0) {
        alert('チップがなくなったので5000チップ配布します！');
        userData.chips = 5000;
    }

    localStorage.setItem('user_' + currentUserId, JSON.stringify(userData));
    document.getElementById('chips').textContent = userData.chips;

    document.getElementById('restart-btn').style.display = 'block';
}

// ベットボタン
document.getElementById('bet-btn').addEventListener('click', function() {
    const betInput = document.getElementById('bet-amount');
    const bet = parseInt(betInput.value);

    if (isNaN(bet) || bet <= 0) {
        alert('正しいベット額を入力してください');
        return;
    }
    if (bet > userData.chips) {
        alert('持っているチップ以上は賭けられません');
        return;
    }

    currentBet = bet;
    userData.chips -= currentBet;
    localStorage.setItem('user_' + currentUserId, JSON.stringify(userData));
    document.getElementById('chips').textContent = userData.chips;

    document.getElementById('bet-area').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    startGame();
});

// ヒット
document.getElementById('hit-btn').addEventListener('click', function() {
    playerCards.push(getRandomCard());
    updateHands();

    if (calculateTotal(playerCards) > 21) {
        endGame('lose');
    }
});

// スタンド
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

// もう一回
document.getElementById('restart-btn').addEventListener('click', function() {
    document.getElementById('bet-area').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementB
