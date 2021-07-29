const humberIcon = document.querySelector('.humber-icon');
const dropdown = document.querySelector('.dropdown');

// 綁定點擊事件：漢堡選單點擊觸發，切換 active 樣式
humberIcon.addEventListener('click', function (e) {
    dropdown.classList.toggle('active')
});