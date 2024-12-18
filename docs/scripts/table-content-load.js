function createCell(content) {
    const cell = document.createElement("div");
    cell.className = "table-cell";
    cell.textContent = content;
    return cell;
}

document.addEventListener("DOMContentLoaded", async () => {
    const tableWrapper = document.querySelector(".table-wrapper");
    const bestOnWeekSec = document.querySelector(".best_on_week");

    try {
        const preloader = document.createElement("div");
        preloader.className = "preloader";
        bestOnWeekSec.appendChild(preloader);

        const randomSkip = Math.floor(Math.random() * 190)

        const response = await fetch(`https://dummyjson.com/products?limit=5&skip=${randomSkip}`);
        if (!response.ok) throw new Error("Ошибка загрузки данных");

        const data = await response.json();
        preloader.remove();

        data.products.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "table-row";

            const numberCell = createCell(index + 1);
            const titleCell = createCell(item.title);
            const genreCell = createCell(item.category);
            const ratingCell = createCell(item.rating);

            row.appendChild(numberCell);
            row.appendChild(titleCell);
            row.appendChild(genreCell);
            row.appendChild(ratingCell);
            tableWrapper.appendChild(row);
        });
    } catch (error) {
        const errorBlock = document.createElement("div");
        errorBlock.textContent = `⚠ Ошибка: ${error.message}`;
        errorBlock.className = "error";
        bestOnWeekSec.appendChild(errorBlock);
    }
});
