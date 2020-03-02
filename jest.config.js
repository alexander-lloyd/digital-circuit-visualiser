/* eslint-env node */
/* eslint-disable max-len */

module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
    },
    setupFilesAfterEnv: [
        '<rootDir>/setupTests.js',
        'jest-canvas-mock'
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!<rootDir>/src/index.tsx',
        '!<rootDir>/src/lib/parser/parser.ts'
    ]
};
