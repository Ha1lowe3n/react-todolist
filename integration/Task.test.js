describe("Task", () => {
    it("Task is done base example, visually looks correct", async () => {
        // APIs from jest-puppeteer
        // eslint-disable-next-line no-undef
        await page.goto(
            "http://localhost:9009/iframe.html?id=todolist-task--task-is-done-example&viewMode=story"
        );
        // eslint-disable-next-line no-undef
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
    it("Task is not done base example, visually looks correct", async () => {
        // APIs from jest-puppeteer
        // eslint-disable-next-line no-undef
        await page.goto(
            "http://localhost:9009/iframe.html?path=/story/todolist-task--task-is-not-done-example"
        );
        // eslint-disable-next-line no-undef
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
