export default {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jsdom",
    testMatch: ["**/tests/**/*.test.js"], // only runs tests in the tests folder
    transform: {},
}