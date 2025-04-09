module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.test.json', // Use the test-specific TS config
            },
        ],
    },
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1', // Match the paths from tsconfig.json
    },
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};