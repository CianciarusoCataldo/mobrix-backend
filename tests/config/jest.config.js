module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../../",
  testMatch: ["<rootDir>/tests/test-suites/**/*mbx-test.ts"],
  testPathIgnorePatterns: ["/src/index.ts", "/src/types/"],
  coveragePathIgnorePatterns: ["/tests/test-suites/", "/tests/config/"],
  collectCoverage: true,
  verbose: true,
  coverageThreshold: {
    global: {
      lines: 100,
    },
  },
};
