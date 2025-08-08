// 首页交互逻辑
const searchBtn = document.getElementById('searchBtn');
const taskInput = document.getElementById('taskInput');
if (searchBtn) searchBtn.onclick = handleSearch;
if (taskInput) taskInput.onkeydown = function(e) {
  if (e.key === 'Enter') handleSearch();
};

function handleSearch() {
  const task = document.getElementById('taskInput').value.trim();
  if (!task) return;
  
  // 显示加载状态
  const loadingIndicator = document.getElementById('loadingIndicator');
  const searchBtn = document.getElementById('searchBtn');
  if (loadingIndicator) loadingIndicator.classList.remove('hidden');
  if (searchBtn) searchBtn.disabled = true;
  
  // 保存任务到 localStorage
  localStorage.setItem('currentTask', task);
  
  // 延迟跳转，让用户看到加载状态
  setTimeout(() => {
    window.location.href = 'suggestion.html';
  }, 1500); // 延迟1.5秒
}

// 搜索建议标签点击事件
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
  tag.onclick = function() {
    if (taskInput) {
      taskInput.value = this.textContent;
      taskInput.focus();
    }
  };
}); 