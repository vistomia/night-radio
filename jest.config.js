export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
};
