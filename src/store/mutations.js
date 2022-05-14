// import { state } from "./index";

export default {
  setTheme(state, theme) {
    state.app.theme = theme;
  },
};

// function findInHistory(search) {
//   let result = false;
//   if ((state, searchHistories.searchObjects.length > 0)) {
//     state.searchHistories.searchObjects.forEach((o, i) => {
//       if (o.title == search.title) {
//         return true;
//       }
//     });
//   }
//   return result;
// }
