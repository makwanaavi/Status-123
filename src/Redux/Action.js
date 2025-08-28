import * as types from "./ActionType";

// Status actions
export const setStatuses = (statuses) => ({
  type: types.SET_STATUSES,
  payload: statuses,
});
export const setActiveCategory = (category) => ({
  type: types.SET_ACTIVE_CATEGORY,
  payload: category,
});
export const setSearchQuery = (query) => ({
  type: types.SET_SEARCH_QUERY,
  payload: query,
});
export const toggleLike = (id) => ({ type: types.TOGGLE_LIKE, payload: id });
export const toggleSave = (id) => ({ type: types.TOGGLE_SAVE, payload: id });
export const setSelectedStatus = (status) => ({
  type: types.SET_SELECTED_STATUS,
  payload: status,
});
export const addStatus = (status) => ({
  type: types.ADD_STATUS,
  payload: status,
});

export const fetchStatusesRequest = () => ({
  type: types.FETCH_STATUSES_REQUEST,
});
export const fetchStatusesSuccess = (statuses) => ({
  type: types.FETCH_STATUSES_SUCCESS,
  payload: statuses,
});
export const fetchStatusesFailure = () => ({
  type: types.FETCH_STATUSES_FAILURE,
});

export const fetchStatuses = () => async (dispatch) => {
  dispatch(fetchStatusesRequest());
  try {
    const response = await fetch("/api/statuses");
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    dispatch(fetchStatusesSuccess(data));
  } catch {
    dispatch(fetchStatusesFailure());
  }
};

// User actions
export const setCurrentUser = (user) => ({
  type: types.SET_CURRENT_USER,
  payload: user,
});
export const addSavedStatus = (id) => ({
  type: types.ADD_SAVED_STATUS,
  payload: id,
});
export const removeSavedStatus = (id) => ({
  type: types.REMOVE_SAVED_STATUS,
  payload: id,
});
export const followUser = (id) => ({ type: types.FOLLOW_USER, payload: id });
export const unfollowUser = (id) => ({
  type: types.UNFOLLOW_USER,
  payload: id,
});

// Editor actions
export const setText = (text) => ({ type: types.SET_TEXT, payload: text });
export const setFont = (font) => ({ type: types.SET_FONT, payload: font });
export const setFontSize = (size) => ({
  type: types.SET_FONT_SIZE,
  payload: size,
});
export const setColor = (color) => ({ type: types.SET_COLOR, payload: color });
export const setBackground = (bg) => ({
  type: types.SET_BACKGROUND,
  payload: bg,
});
export const setBackgroundType = (bgType) => ({
  type: types.SET_BACKGROUND_TYPE,
  payload: bgType,
});
export const setAlignment = (align) => ({
  type: types.SET_ALIGNMENT,
  payload: align,
});
export const setEditorOpen = (open) => ({
  type: types.SET_EDITOR_OPEN,
  payload: open,
});
export const setEditorSearchQuery = (query) => ({
  type: types.SET_EDITOR_SEARCH_QUERY,
  payload: query,
});
export const resetEditor = () => ({ type: types.RESET_EDITOR });
