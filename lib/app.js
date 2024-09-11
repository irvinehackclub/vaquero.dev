class ApplicationHelper {
    get environment () {
        return process.env.NODE_ENV
    }

    get development () {
        return this.environment == "development"
    }

    get dev () {
        return this.development
    }

    pageTitle (pageTitle) {
        let title = this.dev ? "🛠️ " : "";
        title += pageTitle ? `${pageTitle} – ` : "";
        title += "Vaquero IDE";

        return title;
    }
}

const app = new ApplicationHelper;

// globalThis.app = app;

export default app;
