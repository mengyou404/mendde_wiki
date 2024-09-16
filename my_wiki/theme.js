document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索功能
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const entryList = document.getElementById('entry-list');
    const entries = Array.from(entryList.getElementsByTagName('a'));
    const entryTexts = entries.map(entry => entry.textContent.toLowerCase());
    const entryPinyin = entries.map(entry => pinyin(entry.textContent).join('').toLowerCase()); // 将条目转换为拼音

    // 监听输入框变化
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchResults.innerHTML = ''; // 清空搜索结果
        searchResults.style.display = searchTerm ? 'block' : 'none';

        if (!searchTerm) return;

        // 遍历所有条目，查找匹配项
        entries.forEach((entry, index) => {
            if (entryTexts[index].includes(searchTerm) || entryPinyin[index].includes(searchTerm)) {
                const listItem = document.createElement('li');
                const textContent = entry.textContent;
                const highlightedText = textContent.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
                listItem.innerHTML = highlightedText;
                listItem.appendChild(document.createElement('br'));
                listItem.appendChild(document.createElement('br'));
                listItem.appendChild(document.createElement('hr'));
                listItem.appendChild(document.createElement('br'));
                listItem.appendChild(document.createElement('br'));
                listItem.appendChild(entry.cloneNode(true));
                searchResults.appendChild(listItem);
            }
        });
    });

    // 确保搜索结果容器在点击其他地方时隐藏
    window.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });

    // 处理分类点击事件
    const categories = document.querySelectorAll('.categories ul li a');
    categories.forEach(category => {
        category.addEventListener('click', function(event) {
            event.preventDefault();
            const categoryName = this.textContent.toLowerCase();
            entryList.innerHTML = ''; // 清空当前条目列表

            // 过滤并显示相应分类的条目
            entries.forEach(entry => {
                const entryCategory = entry.dataset.category.toLowerCase();
                if (entryCategory === categoryName) {
                    const listItem = document.createElement('li');
                    listItem.appendChild(entry.cloneNode(true));
                    entryList.appendChild(listItem);
                }
            });
        });
    });
});