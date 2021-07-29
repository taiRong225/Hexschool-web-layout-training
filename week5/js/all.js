// let data = [
//     {
//         content: "把冰箱發霉的檸檬拿去丟",
//         isChecked: false,
//     },
//     {
//         content: "打電話叫媽媽匯款給我",
//         isChecked: true,
//     }
// ]

// 陣列資料
let data = [];

// 當前tab狀態
let currentTabType = 'all';

// 計數器
let count = 0;

// 清單
const todoList = document.querySelector('.todoList');

// 新增按鈕
const plusBtn = document.querySelector('.plus');

// main
const main = document.querySelector('.main');

// 待完成數量
const peddingTotal = document.querySelector('.peddingTotal');

// tabLink
const tabLink = document.querySelector('.tab');

// todo input
const todo = document.querySelector('.todo');

// 清除已完成按鈕
const clearCompleteBtn = document.querySelector('.clearCompleteBtn');

// 綁定監聽事件：鍵盤按下
todo.addEventListener('keydown', function (e) {

    // 檢查按下 Enter，觸發點擊新增按鈕
    if (e.keyCode === 13) plusBtn.click();
})

// 綁定監聽事件：點擊新增按鈕
plusBtn.addEventListener('click', function (e) {

    // 檢查資料
    if (!todo.value) return alert('請輸入待辦事項');

    // 計數器＋1
    count++;

    // 新增資料到陣列去
    data.push({
        id: count,
        content: todo.value,
        isChecked: false
    });

    // 渲染資料
    renderData(currentTabType);

    // 清空欄位
    todo.value = '';
});

// 綁定監聽事件：tab 切換
tabLink.addEventListener('click', function (e) {

    // 清除Tab 所有 a 元素的 className
    clearTabActive();

    // 將當前被選取得元素增加 active 樣式
    e.target.className = 'active';

    // 設置當前tab狀態
    currentTabType = e.target.dataset.type;

    // 渲染資料
    renderData(currentTabType);
});

// 綁定監聽事件：點擊清除已全部按鈕
clearCompleteBtn.addEventListener('click', function (e) {

    // 確認提醒
    let result = confirm(`確定要清除已完成項目嗎？`);

    // 檢查確認提醒結果：cancel
    if (!result) return;

    // 篩選出已完成的項目，並重新賦予值
    data = data.filter(function (item, index) {
        return !item.isChecked;
    });

    // 渲染畫面
    renderData(currentTabType);
});

// 渲染資料
function renderData(type) {

    // 篩選資料
    const filter = data.filter(function (item, index) {
        if (type === 'all') return item;
        if (type === 'pendding') return !item.isChecked;
        if (type === 'complete') return item.isChecked;
    });

    let html = '';

    filter.forEach(function (item, index) {
        html += `
            <li>
                <div class="checkbox">
                    <input type="checkbox" data-id="${item.id}" id="checkbox${index}" ${item.isChecked ? 'checked' : ''}>
                    <label for="checkbox${index}">${item.content}</label>
                    <i class="delete fas fa-times" data-id="${item.id}"></i>
                </div>
            </li>
        `
    });

    todoList.innerHTML = html;

    // 更新待完成數量
    updatePeddingTotal();

    // 顯示清單列表
    main.classList.remove('d-none');

    // input checkbox
    const checkboxs = document.querySelectorAll('input[type="checkbox"');

    // 針對所有的 input checkbox 綁定監聽事件：change
    checkboxs.forEach(function (item, index) {
        item.addEventListener('change', function (e) {

            // 勾選狀態 true | false
            const isChecked = e.target.checked;

            // ID
            const id = parseInt(e.target.dataset.id);

            // 更新陣列資料
            data.forEach(function (item, index) {
                if (item.id === id) item.isChecked = isChecked;
            });

            // 更新待完成數量
            updatePeddingTotal();
        });
    });

    // delete btn
    const deleteBtns = document.querySelectorAll('.delete');

    // 針對所有的 .delete 綁定監聽事件：點擊刪除按鈕
    deleteBtns.forEach(function (item, index) {
        item.addEventListener('click', function (e) {

            // ID
            const id = parseInt(e.target.dataset.id);

            // 確認提醒
            let result = confirm(`確定要刪除該待辦事項嗎？`);

            // 檢查確認提醒結果：cancel
            if (!result) return;

            // 篩選出符合的陣列資料索引
            const findIndex = data.findIndex(function (item, index) {
                return item.id === id;
            });

            // 刪除陣列資料
            data.splice(findIndex, 1);

            // 渲染資料
            renderData(currentTabType);
        });
    });
}

// 更新待完成數量
function updatePeddingTotal() {

    // 篩選已完成的項目
    const filter = data.filter(function (item, index) {
        return !item.isChecked;
    });

    // 設置待完成數量
    peddingTotal.textContent = `${filter.length} 個待完成項目`;
}

// 清除Tab 所有 a 元素的 className
function clearTabActive() {
    const tabs = document.querySelectorAll('.tab a');

    tabs.forEach(function (item, index) {
        item.className = '';
    });
}

// 預先把 focus 移到 todo input 上
todo.focus();