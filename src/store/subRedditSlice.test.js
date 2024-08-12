import subRedditReducer, {
    startGetSubreddits,
    getSubredditsSuccess,
    getSubredditsFailed,
} from './subRedditSlice';

describe ('subRedditSlice', () => {
    const initialState = {
        subreddits: [],
        error: false,
        isLoading: false,
    };

    it('should return the inital state', () => {
        expect(subRedditReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle startGetSubreddits', () => {
        const action = startGetSubreddits();
        const expectedState = {
            ...initialState,
            isLoading: true,
            error: false,
        };
        expect(subRedditReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle getSubredditsSuccess', () => {
        const subreddits = [{name: 'tech'}, {name: 'javascript'}];
        const action = getSubredditsSuccess(subreddits);
        const expectedState = {
            ...initialState,
            subreddits,
            isLoading: false,
        };
        expect(subRedditReducer(initialState, action)).toEqual(expectedState);
    })

    it('should handle getSubredditsFailed', () => {
        const action = getSubredditsFailed();
        const expectedState = {
            ...initialState,
            isLoading: false,
            error: true,
        };
        expect(subRedditReducer(initialState, action)).toEqual(expectedState);
    });
})