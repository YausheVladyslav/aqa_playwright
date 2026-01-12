
export default class BaseComponent {
    constructor(page, rootContainer) {
        this.page = page;
        this.root = page.locator(rootContainer) ?? page.locator('body');
    }
}