// ==UserScript==
// @name        Pubvn.net
// @namespace   Violentmonkey Scripts
// @match       http://pubvn.net/bar/threads/*
// http://pubvn.net/movie/vn/player_forum_html5.php?userPick=1&autoCount=5&iMov=31234&iEps=312517&iPl=undefined
// @grant       none
// @version     1.0
// @author      thanhlouis
// @description 5/7/2025, 1:11:21 PM
// @run-at document-idle
// ==/UserScript==

document.addEventListener('keydown', function(event) {
    const iframe = document.querySelector('#container');
    // Bấm nút trả lùi 10s
    if (event.code === 'ArrowLeft') {
        iframe.contentWindow.document.querySelector('.vjs-control.vjs-button.vjs-rewind-button.vjs-rewind-control').click();
        console.log('a')
    }
    // Bấm nút trả tới 10s
    if (event.code === 'ArrowRight') {
        iframe.contentWindow.document.querySelector('.vjs-control.vjs-button.vjs-forward-button.vjs-forward-control').click();
    }
    // Bấm nút Fullscreen
    if (event.code === 'KeyF') {
        iframe.contentWindow.document.querySelector('.vjs-fullscreen-control.vjs-control.vjs-button.vjs-show-control-text').click();
    }
    // Bấm nút Space
    if (event.code === 'Space') {
        const playButton = iframe.contentWindow.document.querySelector('.vjs-play-control.vjs-control.vjs-button');
        if (playButton) {
            if (playButton.classList.contains('vjs-paused')) {
                // Nếu nút đang ở trạng thái "Pause", bấm để "Play"
                playButton.click();
                console.log('Play');
            } else if (playButton.classList.contains('vjs-playing')) {
                // Nếu nút đang ở trạng thái "Playing", bấm để "Pause"
                playButton.click();
                console.log('Pause');
            }
        }
    }
});
