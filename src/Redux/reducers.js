import { combineReducers } from "redux";
import * as types from "./ActionType";

// ...existing initial states from your slices...

const statusInitialState = {
  statuses: [],
  filteredStatuses: [],
  categories: [
    "All",
    "Love",
    "Motivational",
    "Sad",
    "Funny",
    "Life",
    "Friendship",
    "Success",
    "Travel",
    "Nature",
    "Wisdom",
    "Happiness",
    "Dreams",
    "Faith",
    "Family",
    "Attitude",
    "Birthday",
    "Good Morning",
    "Good Night",
    "Festival",
    "Fashion",
    "Sports",
    "Music",
    "Food",
    "Technology",
  ],
  activeCategory: "All",
  searchQuery: "",
  loading: false,
  selectedStatus: null,
};

function statusReducer(state = statusInitialState, action) {
  switch (action.type) {
    case types.SET_STATUSES:
      return {
        ...state,
        statuses: action.payload,
        filteredStatuses: action.payload,
      };
    case types.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
        filteredStatuses:
          action.payload === "All"
            ? state.statuses
            : state.statuses.filter((s) => s.category === action.payload),
      };
    case types.SET_SEARCH_QUERY:
      const query = action.payload.toLowerCase();
      return {
        ...state,
        searchQuery: action.payload,
        filteredStatuses: state.statuses.filter(
          (s) =>
            s.text.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query) ||
            s.tags.some((tag) => tag.toLowerCase().includes(query))
        ),
      };
    case types.TOGGLE_LIKE:
      return {
        ...state,
        statuses: state.statuses.map((s) =>
          s.id === action.payload
            ? {
                ...s,
                isLiked: !s.isLiked,
                likes: s.likes + (s.isLiked ? -1 : 1),
              }
            : s
        ),
        filteredStatuses: state.filteredStatuses.map((s) =>
          s.id === action.payload
            ? {
                ...s,
                isLiked: !s.isLiked,
                likes: s.likes + (s.isLiked ? -1 : 1),
              }
            : s
        ),
      };
    case types.TOGGLE_SAVE:
      return {
        ...state,
        statuses: state.statuses.map((s) =>
          s.id === action.payload
            ? {
                ...s,
                isSaved: !s.isSaved,
                saves: s.saves + (s.isSaved ? -1 : 1),
              }
            : s
        ),
        filteredStatuses: state.filteredStatuses.map((s) =>
          s.id === action.payload
            ? {
                ...s,
                isSaved: !s.isSaved,
                saves: s.saves + (s.isSaved ? -1 : 1),
              }
            : s
        ),
      };
    case types.SET_SELECTED_STATUS:
      return { ...state, selectedStatus: action.payload };
    case types.ADD_STATUS:
      return {
        ...state,
        statuses: [action.payload, ...state.statuses],
        filteredStatuses: [action.payload, ...state.filteredStatuses],
      };
    case types.FETCH_STATUSES_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_STATUSES_SUCCESS:
      return {
        ...state,
        statuses: action.payload,
        filteredStatuses: action.payload,
        loading: false,
      };
    case types.FETCH_STATUSES_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

const userInitialState = {
  currentUser: null,
  savedStatuses: [],
  followedUsers: [],
};

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };

    case types.ADD_SAVED_STATUS:
      return {
        ...state,
        savedStatuses: [...state.savedStatuses, action.payload],
      };
    case types.REMOVE_SAVED_STATUS:
      return {
        ...state,
        savedStatuses: state.savedStatuses.filter(
          (id) => id !== action.payload
        ),
      };
    case types.FOLLOW_USER:
      return state.followedUsers.includes(action.payload)
        ? state
        : { ...state, followedUsers: [...state.followedUsers, action.payload] };
    case types.UNFOLLOW_USER:
      return {
        ...state,
        followedUsers: state.followedUsers.filter(
          (id) => id !== action.payload
        ),
      };
    default:
      return state;
  }
}

const editorInitialState = {
  text: "",
  font: "Inter",
  fontSize: 24,
  color: "#ffffff",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backgroundType: "gradient",
  alignment: "center",
  isEditorOpen: false,
  availableFonts: [
    "Inter",
    "Playfair Display",
    "Montserrat",
    "Roboto",
    "Open Sans",
    "Poppins",
    "Lora",
    "Merriweather",
    "Source Sans Pro",
    "Raleway",
    "Nunito",
    "Ubuntu",
    "Dancing Script",
    "Pacifico",
    "Caveat",
  ],
  availableBackgrounds: [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  ],
  searchQuery: "",
};

function editorReducer(state = editorInitialState, action) {
  switch (action.type) {
    case types.SET_TEXT:
      return { ...state, text: action.payload };
    case types.SET_FONT:
      return { ...state, font: action.payload };
    case types.SET_FONT_SIZE:
      return { ...state, fontSize: action.payload };
    case types.SET_COLOR:
      return { ...state, color: action.payload };
    case types.SET_BACKGROUND:
      return { ...state, background: action.payload };
    case types.SET_BACKGROUND_TYPE:
      return { ...state, backgroundType: action.payload };
    case types.SET_ALIGNMENT:
      return { ...state, alignment: action.payload };
    case types.SET_EDITOR_OPEN:
      return { ...state, isEditorOpen: action.payload };
    case types.SET_EDITOR_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case types.RESET_EDITOR:
      return {
        ...state,
        text: "",
        font: "Inter",
        fontSize: 24,
        color: "#ffffff",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundType: "gradient",
        alignment: "center",
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  status: statusReducer,
  user: userReducer,
  editor: editorReducer,
});

export default rootReducer;
