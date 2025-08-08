// 反馈页交互逻辑
window.onload = function() {
  showFeedback(60); // 示例进度
};

function showFeedback(progress) {
  // 设置圆环进度
  const circle = document.getElementById('progressBar');
  const text = document.getElementById('progressText');
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  if (circle) circle.setAttribute('stroke-dashoffset', offset);
  if (text) text.textContent = progress + '%';
  const thanks = document.getElementById('thanks');
  if (thanks) thanks.textContent = '';
}

// emoji 反馈
const emojiEls = document.querySelectorAll('.emoji');
emojiEls.forEach(el => {
  el.onclick = function() {
    let msg = "Thank you for your feedback!";
    if (this.dataset.feedback === "good") msg = "Glad it helped you!";
    if (this.dataset.feedback === "bad") msg = "Thanks for your feedback, we'll keep improving!";
    const thanks = document.getElementById('thanks');
    if (thanks) thanks.textContent = msg;
    // 2秒后自动跳转回首页
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 2000);
  };
}); 