export default {
    testEnvironment: "node",
    setupFiles: ["reflect-metadata"],
    transform: {
        "^.+\\.(t|j)sx?$": [
            "@swc/jest",
            {
                jsc: {
                    target: "es2022",
                    parser: {
                        syntax: "typescript",
                        dynamicImport: true,
                        decorators: true, // <-- Added
                    },
                    transform: {
                        legacyDecorator: true, // <-- Added
                        decoratorMetadata: true, // <-- Added
                    },
                    keepClassNames: true, // <-- Added (important for TypeORM entities)
                },
            },
        ],
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
}
