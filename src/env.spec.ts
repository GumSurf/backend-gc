const dotenv = require('dotenv');

describe('Environment Variables', () => {
    beforeAll(() => {
        dotenv.config();
    });

    test('should load JWT_SECRET', () => {
        expect(process.env.JWT_SECRET).toBeDefined();
    });

    test('JWT_SECRET should have a specific value', () => {
        expect(process.env.JWT_SECRET).toBe('eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzkzMjU3MSwiaWF0IjoxNzA3OTMyNTcxfQ.2gHByHKJOo07qS-NlZEEsjiIsBafkAbdfSr1Y0iRw3Q'); // Remplacez par la valeur attendue
    });
});
