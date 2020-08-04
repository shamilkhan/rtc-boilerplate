import { slice } from './index';

describe('Check Generate of Pagination Collection', () => {
    it('', () => {
        const result = slice.caseReducers.wait({
            expecting: false,
            waiting: false,
            data: null,
            error: null
        });
        expect(result.error).toBeNull();
        expect(result.waiting).toBe(true);
    });
});