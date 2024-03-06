import { actions } from "../actions";

export const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.POSTS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.post.POSTS_FETCHED:
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    case actions.post.POST_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.post.POST_CREATED:
      return {
        ...state,
        posts: [action.data, ...state.posts],
      };
    case actions.post.POST_EDITED: {
      const updatedPosts = state.posts.filter((post) => {
        if (post.id === action.postId) {
          return {
            ...post,
            ...action.data,
          };
        } else {
          return post;
        }
      });
      return {
        ...state,
        posts: updatedPosts,
      };
    }

    default:
      return state;
  }
};
