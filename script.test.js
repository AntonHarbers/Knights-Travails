const {KnightsTravails} = require('./script.js');

describe('KnightsTravails', () => {
    describe('#printStart', () => {
        test('should print the start position', () => {
            const start = [0, 0];
            const end = [7, 7];
            const knightsTravails = new KnightsTravails(start, end);
            const returnStart = knightsTravails.printStart();
            expect(returnStart).toEqual(start);
        });
    });
});