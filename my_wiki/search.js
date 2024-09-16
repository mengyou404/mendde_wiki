document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const entryList = document.getElementById('entry-list');

    // 获取所有条目链接
    const entries = Array.from(entryList.getElementsByTagName('a'));
    const entryTexts = entries.map(entry => entry.textContent.toLowerCase());

    // 监听输入框变化
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        entries.forEach((entry, index) => {
            if (entryTexts[index].includes(searchTerm)) {
                entry.style.display = 'block';
            } else {
                entry.style.display = 'none';
            }
        });
    });
});