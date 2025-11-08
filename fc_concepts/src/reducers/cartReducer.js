export const initialCartState = { items: {} };

export default function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { book } = action.payload;
      const existing = state.items[book.id]?.quantity || 0;
      return {
        ...state,
        items: { ...state.items, [book.id]: { book, quantity: existing + 1 } },
      };
    }
    case "REMOVE": {
      const { id } = action.payload;
      const items = { ...state.items };
      delete items[id];
      return { ...state, items };
    }
    case "CLEAR":
      return initialCartState;
    default:
      return state;
  }
}
