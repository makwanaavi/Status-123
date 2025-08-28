import * as types from "./ActionType";

// Status actions
export const setStatuses = (statuses) => ({ type: types.SET_STATUSES, payload: statuses,});
export const setActiveCategory = (category) => ({ type: types.SET_ACTIVE_CATEGORY, payload: category});
export const toggleLike = (id) => ({ type: types.TOGGLE_LIKE, payload: id });
export const toggleSave = (id) => ({ type: types.TOGGLE_SAVE, payload: id });
export const setSelectedStatus = (status) => ({ type: types.SET_SELECTED_STATUS, payload: status });
