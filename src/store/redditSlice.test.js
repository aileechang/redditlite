import redditSlice, { 
    setPosts,
    getPostsFailed,
    getPostsSuccess,
    startGetPosts,
    setSearchTerm,
    setSelectedSubreddit,
    toggleShowingComments,
    getCommentsFailed,
    getCommentsSuccess,
    startGetComments } from "./redditSlice";

describe('redditSlice', () => {
    const initialState = {
        posts: [],
        error: false,
        isLoading: false,
        searchTerm: '',
        selectedSubreddit: '/r/news/',
    };

    // Test for setPosts reducer
    it('should update the posts with the given payload', () => {
        const newPosts = [
        { id: 1, title: 'Post 1', comments: [] },
        { id: 2, title: 'Post 2', comments: [] },
        ];

        const action = setPosts(newPosts);

        const updatedState = redditSlice({ ...initialState }, action);

        expect(updatedState.posts).toEqual(newPosts);
        expect(updatedState.posts.length).toBe(2);
        expect(updatedState.posts[0].title).toBe('Post 1');
    });

    // Test for setSearchTerm reducer
    it('should update searchTerm', () => {
        const newSearchTerm = 'example';

        const action = setSearchTerm(newSearchTerm);

        const updatedState = redditSlice(initialState, action);

        expect(updatedState.searchTerm).toBe(newSearchTerm);
    });

    // Test for setSelectedSubreddit reducer
    it('should update selectedSubreddit and clear searchTerm', () => {
        const newSubreddit = '/r/javascript';
        
        const action = setSelectedSubreddit(newSubreddit);

        const updatedState = redditSlice(initialState, action);

        expect(updatedState.selectedSubreddit).toBe(newSubreddit);
        expect(updatedState.searchTerm).toBe('');
    });

    // Test for startGetPosts reducer
    it('should set isLoading to true and error to false', () => {
        const updatedState = redditSlice(initialState, startGetPosts());
        
        expect(updatedState.isLoading).toBe(true);
        expect(updatedState.error).toBe(false);
    });

    // Test for getPostsSuccess reducer
    it('should set isLoading to false and update posts', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    
    const updatedState = redditSlice(initialState, getPostsSuccess(mockPosts));
    
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.posts).toEqual(mockPosts);
    });

    // Test for getPostsFailed reducer
    it('should set isLoading to false and error to true', () => {
        const updatedState = redditSlice(initialState, getPostsFailed());
        
        expect(updatedState.isLoading).toBe(false);
        expect(updatedState.error).toBe(true);
    });

    // Test for toggleShowingComments reducer
    it('should toggle showingComments for a post', () => {
        const mockPosts = [{ id: 1, showingComments: false }];
    
        const updatedState = redditSlice({ ...initialState, posts: mockPosts }, toggleShowingComments(0));

        expect(updatedState.posts[0].showingComments).toBe(true);
    });

    // Test for startGetComments reducer
    it('should set loadingComments to true and error to false', () => {
        const mockPosts = [{
              id: 1,
              showingComments: false,
              loadingComments: false,
              error: true,
        }];
      
        const updatedState = redditSlice({ ...initialState, posts: mockPosts }, startGetComments(0));
      
        expect(updatedState.posts[0].loadingComments).toBe(true);
        expect(updatedState.posts[0].error).toBe(false);
    });

    // Test for getCommentsSuccess reducer
    it('should set loadingComments to false and update comments', () => {
        const mockPosts = [{
            id: 1,
            showingComments: true,
            loadingComments: true,
            comments: [],
        }];
        const mockComments = [{ id: 101, text: 'This is a comment' }];

        const action = getCommentsSuccess({ index: 0, comments: mockComments, });

        const updatedState = redditSlice({ ...initialState, posts: mockPosts }, action);

        expect(updatedState.posts[0].loadingComments).toBe(false);
        expect(updatedState.posts[0].comments).toEqual(mockComments);
    });

    // Test for getCommentsFailed reducer
    it('should set loadingComments to false and error to true', () => {
        const mockPosts = [{
            id: 1,
            showingComments: true,
            loadingComments: true,
            error: false,
            comments: [],
        }];

        const action = getCommentsFailed(0);

        const updatedState = redditSlice({ ...initialState, posts: mockPosts }, action);


        expect(updatedState.posts[0].loadingComments).toBe(false);
        expect(updatedState.posts[0].error).toBe(true);
    });
});