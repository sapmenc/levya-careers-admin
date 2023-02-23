export const filteredJobsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NEW_DATA":
      return [...action.newData];
  }
};
