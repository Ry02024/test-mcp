// 現在時刻を表示する関数
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP');
    document.getElementById('current-time').textContent = timeString;
}

// 最終更新時刻を表示
function displayLastUpdated() {
    const lastUpdated = data.lastUpdated || new Date().toLocaleString('ja-JP');
    document.getElementById('last-updated').textContent = lastUpdated;
}

// 天気情報を表示
function displayWeatherInfo() {
    const weatherInfo = document.getElementById('weather-info');
    
    if (data.weather) {
        const weather = data.weather;
        weatherInfo.innerHTML = `
            <div class="weather-info-detail">
                <div class="weather-temp">${weather.temperature}°C</div>
                <div class="weather-condition">
                    <div>${weather.condition}</div>
                    <div>湿度: ${weather.humidity}%</div>
                </div>
            </div>
        `;
    } else {
        weatherInfo.textContent = 'データが利用できません';
    }
}

// ニュース情報を表示
function displayNewsContent() {
    const newsContent = document.getElementById('news-content');
    
    if (data.news && data.news.length > 0) {
        newsContent.innerHTML = '';
        data.news.forEach(newsItem => {
            const newsElement = document.createElement('div');
            newsElement.className = 'news-item';
            newsElement.innerHTML = `
                <h3>${newsItem.title}</h3>
                <p>${newsItem.summary}</p>
                <div class="news-date">${newsItem.date}</div>
            `;
            newsContent.appendChild(newsElement);
        });
    } else {
        newsContent.innerHTML = '<p>ニュースはありません</p>';
    }
}

// カウンターの初期化と増加機能
function setupCounter() {
    const viewCount = localStorage.getItem('viewCount') || 0;
    document.getElementById('view-count').textContent = viewCount;
    
    document.getElementById('increment-btn').addEventListener('click', () => {
        const currentCount = parseInt(document.getElementById('view-count').textContent);
        const newCount = currentCount + 1;
        document.getElementById('view-count').textContent = newCount;
        localStorage.setItem('viewCount', newCount);
    });
}

// ページ読み込み時の処理
window.addEventListener('DOMContentLoaded', () => {
    // 現在時刻の表示を開始
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // 各セクションの表示を更新
    displayLastUpdated();
    displayWeatherInfo();
    displayNewsContent();
    setupCounter();
});