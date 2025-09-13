// ==UserScript==
// @name Taphoammo
// @namespace Violentmonkey Scripts
// @match *://taphoammo.net/*
// @grant none
// @version 1.0
// @author -
// @description 4/5/2025, 3:09:24 AM
// @grant GM_setClipboard
// @grant GM_getClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Tạo container chính
    const box = document.createElement('div');
    box.style.cssText = `
        position: fixed;
        top: 60px; /* Đặt ở trên cùng, dưới hộp xanh lá */
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    `;

    // Hàm tạo nút mới
    function createButton(text, onClick, customStyle = '') {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.cssText = `
            padding: 8px 15px;
            margin: 5px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            ${customStyle}
        `;
        button.addEventListener('click', onClick);
        box.appendChild(button);
        return button;
    }

    // Thêm container vào trang
    document.body.appendChild(box);

    // Nút: Nhập (tự động điền email + password từ clipboard)
    createButton('Nhập', async () => {
        let str = await navigator.clipboard.readText();
        let parts = str.split(":");
        let email = parts[0];
        let password = parts[1];

        const loginTitle = document.querySelector('h3.card-title');
        if (loginTitle && loginTitle.textContent.trim() === 'Đăng nhập') {
            console.log('Đã tìm thấy tiêu đề Đăng nhập');
            document.querySelector('#login_email').value = email;
            document.querySelector('#login_password').value = password;

            // Cần lấy đúng nút login để click
            const loginButton = document.querySelector('#loginButton');
            if (loginButton) loginButton.click();
        } else {
            console.log('Không tìm thấy tiêu đề Đăng nhập');
        }
    });

    // Nút: Đơn (màu xanh dương)
    createButton('Đơn', () => {
        location.href = "https://taphoammo.net/orders-buy.html";
    }, 'background: #2196F3;');

    // Nút: Đơn2 (màu khác)
createButton('Thoát', async () => {
    try {
        await fetch("https://taphoammo.net/logout.html", { credentials: "include" });
    } catch (e) {
        console.error("Logout lỗi:", e);
    }
    // Dù thành công hay thất bại vẫn chuyển sang login
    location.href = "https://taphoammo.net/login.html";
}, 'background: Red;');

  // Tạo khung hiển thị số dư dưới nút 3
const balanceBox = document.createElement('div');
balanceBox.style.cssText = `
    margin-top: 10px;
    padding: 8px;
    background: #333;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
`;
balanceBox.textContent = "Đang tải số dư...";
box.appendChild(balanceBox);

// Hàm cập nhật số dư
function updateBalanceBox() {
    const balanceEl = document.querySelector('#homeUserBalance');
    if (balanceEl) {
        balanceBox.textContent = "Số dư: " + balanceEl.textContent.trim();
    } else {
        balanceBox.textContent = "Không tìm thấy số dư";
    }
}

// Gọi lần đầu
updateBalanceBox();

// Quan sát thay đổi text trong #homeUserBalance
const target = document.querySelector('#homeUserBalance');
if (target) {
    const observer = new MutationObserver(updateBalanceBox);
    observer.observe(target, { childList: true, characterData: true, subtree: true });
}


})();
