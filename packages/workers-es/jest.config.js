module.exports = {
  ...require(`../../jest.config.base.js`),
  displayName: "workers-es",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
};
