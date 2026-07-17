/* =========================================================
   ПРИВЕТСТВИЯ МЕШОЧКА
   Каждое приветствие — строка, где абзацы разделены "\n\n".
   Пока используется только первое приветствие.
   В будущем при нажатии кнопки будет выбираться случайное. */
const greetings = [
    '☀️ Солнечный привет! Рад встрече!\n\n' +
    'Сегодня в Мешочке особенно хорошее настроение.\n\n' +
    'Давайте выпустим его на волю!\n\n' +
    'Он уже готов поделиться первой улыбкой.'
];

/* ===== Элементы страницы ===== */
const quoteEl = document.getElementById('quote');
const buttonEl = document.getElementById('openSackBtn');
const sackCircleEl = document.getElementById('sackCircle');
const particlesEl = document.getElementById('particles');

const sackImageEl = document.getElementById('sackImage');
const btnIconEl = document.getElementById('btnIcon');

/* =========================================================
   ОТОБРАЖЕНИЕ ПРИВЕТСТВИЯ
   Разбивает текст на абзацы и оформляет их как отдельные
   строки с плавным появлением (см. css/style.css). */
function renderGreeting(text) {
    const paragraphs = text.split('\n\n');
    quoteEl.innerHTML = paragraphs
        .map((paragraph) => `<span class="quote-line">${paragraph}</span>`)
        .join('');
}

/* =========================================================
   ЗАГЛУШКА ДЛЯ ОТСУТСТВУЮЩЕГО ИЗОБРАЖЕНИЯ ТАЛИСМАНА
   Если assets/mascots/optimized/meshochek-main.png не найден, скрываем <img>
   и показываем соседний эмодзи-фолбэк вместо него. */
function handleImageFallback(imgEl) {
    imgEl.addEventListener('error', () => {
        imgEl.classList.add('is-broken');
    });
}

handleImageFallback(sackImageEl);
handleImageFallback(btnIconEl);

/* =========================================================
   ЧАСТИЦЫ: золотые искорки и улыбающиеся смайлики,
   вылетающие вверх при открытии Мешочка. */
const SPARKLE_COUNT = 6;
const SMILEY_COUNT = 3;
const SMILEY_EMOJIS = ['😊', '😄', '🙂'];

function createParticle(className, emoji) {
    const particle = document.createElement('span');
    particle.className = className;
    particle.textContent = emoji;

    const horizontalOffset = (Math.random() - 0.5) * 120; // px влево/вправо
    const rotation = (Math.random() - 0.5) * 40; // градусы

    particle.style.setProperty('--tx', `${horizontalOffset}px`);
    particle.style.setProperty('--rot', `${rotation}deg`);
    particle.style.left = `${45 + Math.random() * 10}%`;

    particle.addEventListener('animationend', () => particle.remove());

    return particle;
}

function spawnParticles() {
    for (let i = 0; i < SPARKLE_COUNT; i++) {
        particlesEl.appendChild(createParticle('sparkle', '✨'));
    }

    for (let i = 0; i < SMILEY_COUNT; i++) {
        const emoji = SMILEY_EMOJIS[Math.floor(Math.random() * SMILEY_EMOJIS.length)];
        particlesEl.appendChild(createParticle('smiley-particle', emoji));
    }
}

/* =========================================================
   ОТКРЫТИЕ МЕШОЧКА ПО НАЖАТИЮ КНОПКИ
   Мешочек слегка "приоткрывается", вокруг него разлетаются
   искорки и смайлики. Анимация длится около 1 секунды. */
const SACK_ANIMATION_DURATION = 650;

function openSack() {
    sackCircleEl.classList.add('is-opening');
    spawnParticles();

    setTimeout(() => {
        sackCircleEl.classList.remove('is-opening');
    }, SACK_ANIMATION_DURATION);
}

buttonEl.addEventListener('click', openSack);

/* ===== Инициализация ===== */
renderGreeting(greetings[0]);
