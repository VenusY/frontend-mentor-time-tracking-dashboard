
function renderData(data) {
    const timeframes = document.querySelectorAll(".main__timeframe");
    
    timeframes.forEach(timeframe => {
        timeframe.addEventListener("click", function() {
            timeframes.forEach((timeframe) => {
                timeframe.classList.remove("main__timeframe--active");
            });
            this.classList.add("main__timeframe--active");
        
            const category = document.querySelectorAll(".inner-container__heading");
            
            for (let i = 0; i < category.length; i++) {
                const currentTime = category[i].parentElement.nextElementSibling.children[0];
                const previousTime = currentTime.nextElementSibling;

                for (let j = 0; j < data.length; j++) {
                    if (category[i].textContent !== data[j].title) {
                        continue;
                    }

                    const dailyData = data[j].timeframes.daily;
                    const weeklyData = data[j].timeframes.weekly;
                    const monthlyData = data[j].timeframes.monthly;

                    if (this.id === "daily") {
                        currentTime.textContent = `${dailyData.current}hrs`;
                        previousTime.textContent = `Yesterday - ${dailyData.previous}hrs`;
                    } else if (this.id === "weekly") {
                        currentTime.textContent = `${weeklyData.current}hrs`;
                        previousTime.textContent = `Last Week - ${weeklyData.previous}hrs`;
                    } else {
                        currentTime.textContent = `${monthlyData.current}hrs`;
                        previousTime.textContent = `Last Month - ${monthlyData.previous}hrs`;
                    }
                }
            }
        });
    });
}

fetch("./js/data.json")
    .then(response => response.json())
    .then(data => {
        renderData(data);
    });