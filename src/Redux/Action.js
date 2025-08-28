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
export const toggleLike = (id) => ({ type: types.TOGGLE_LIKE, payload: id });
export const toggleSave = (id) => ({ type: types.TOGGLE_SAVE, payload: id });
export const setSelectedStatus = (status) => ({
  type: types.SET_SELECTED_STATUS,
  payload: status,
});

// Editor actions
export const setText = (text) => ({
  type: types.SET_TEXT,
  payload: text,
});
export const setFont = (font) => ({
  type: types.SET_FONT,
  payload: font,
});
export const setFontSize = (size) => ({
  type: types.SET_FONT_SIZE,
  payload: size,
});
export const setColor = (color) => ({
  type: types.SET_COLOR,
  payload: color,
});
export const setBackground = (background) => ({
  type: types.SET_BACKGROUND,
  payload: background,
});
export const setAlignment = (alignment) => ({
  type: types.SET_ALIGNMENT,
  payload: alignment,
});
export const setEditorOpen = (isOpen) => ({
  type: types.SET_EDITOR_OPEN,
  payload: isOpen,
});
export const resetEditor = () => ({
  type: types.RESET_EDITOR,
});
