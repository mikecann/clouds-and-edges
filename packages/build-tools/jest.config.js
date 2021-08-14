module.exports = {
  ...require(`../../jest.config.base.js`),
  displayName: "shared",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
};
