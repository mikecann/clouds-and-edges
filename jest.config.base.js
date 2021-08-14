module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  verbose: true,
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
