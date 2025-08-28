import * as types from "../Redux/ActionType";
import { mockStatuses } from "../data/data";

const initialState = {
  statuses: mockStatuses,
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
  selectedStatus: null,
};

function statusReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_STATUSES:
      return { ...state, statuses: action.payload };
    case types.SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    case types.TOGGLE_LIKE:
      return {
        ...state,
        statuses: state.statuses.map((s) =>
          s.id === action.payload ? { ...s, isLiked: !s.isLiked } : s
        ),
        
      };
    case types.TOGGLE_SAVE:
      return {
        ...state,
        statuses: state.statuses.map((s) =>
          s.id === action.payload ? { ...s, isSaved: !s.isSaved } : s
        ),
      };
    case types.SET_SELECTED_STATUS:
      return { ...state, selectedStatus: action.payload };
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

    case types.SET_ALIGNMENT:
      return { ...state, alignment: action.payload };
    case types.SET_EDITOR_OPEN:
      return { ...state, isEditorOpen: action.payload };

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

export { editorReducer };
export default statusReducer;
