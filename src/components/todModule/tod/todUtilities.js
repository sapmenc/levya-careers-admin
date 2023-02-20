import Fuse from "fuse.js";
export const defaultExperience = {
  id: Date.now(),
  companyName: null,
  position: null,
  isCurrentlyWorking: false,
  startDate: "",
  endDate: "",
  jobDescription: null,
};
export const defaultEducation = {
  id: Date.now(),
  institution: null,
  courseType: null,
  courseName: null,
  isCurrentlyPersuing: false,
  startDate: "",
  endDate: "",
  description: null,
};

export const experiencesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPERIENCE":
      return [...state, { ...defaultExperience, id: Date.now() }];
    case "UPDATE_EXPERIENCE":
      return state.map((experience) => {
        if (experience.id === action.payload.id) {
          return { ...experience, ...action.payload.updates };
        }
        return experience;
      });
    case "ADD_NEW_DATA":
      return [...action.newData];
    case "DELETE_EXPERIENCE":
      return state.filter((experience) => experience.id !== action.payload.id);
    default:
      return state;
  }
};

export const educationsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EDUCATION":
      return [...state, { ...defaultEducation, id: Date.now() }];
    case "UPDATE_EDUCATION":
      return state.map((education) => {
        if (education.id === action.payload.id) {
          return { ...education, ...action.payload.updates };
        }
        return education;
      });
    case "ADD_NEW_DATA":
      return [...action.newData];
    case "DELETE_EDUCATION":
      return state.filter((education) => education.id !== action.payload.id);
    default:
      return state;
  }
};

export const preferredLocationsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_LOCATION": {
      let found = false;
      for (let obj of state) {
        if (
          JSON.stringify(obj.locationData) ===
          JSON.stringify({ ...action.locationData })
        ) {
          found = true;
          break;
        }
      }
      if (!found) {
        state.push({
          id: Date.now(),
          locationData: { ...action.locationData },
        });
      }

      return [...state];
    }
    case "ADD_NEW_DATA":
      return [...action.newData];
    case "REMOVE_LOCATION": {
      state = state.filter((obj) => {
        return action.id !== obj.id;
      });
      return [...state];
    }
  }
};

export const filteredProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NEW_DATA":
      return [...action.newData];
  }
};

// Filter
export const filterProfiles = (
  profiles,
  dispatchFilteredProfiles,
  filterProps
) => {
  let flag = false;
  let res = profiles;
  console.log("profiles :", res);
  if (filterProps.profileId !== "") {
    flag = true;
    const profileFuse = new Fuse(res, {
      keys: ["profileId"],
      threshold: 0.5,
    });
    res = profileFuse.search(filterProps.profileId);
  }
  if (filterProps.searchQuery !== "") {
    flag = true;
    const searchFuse = new Fuse(res, {
      keys: [
        "profileId",
        "name",
        "profileTitle",
        "todTitle.name",
        "primaryLocation.country",
        "status",
      ],
      threshold: 0.2,
    });
    res = searchFuse.search(filterProps.searchQuery);
  }
  if (filterProps.todTitle !== "") {
    flag = true;
    const todTitleFuse = new Fuse(res, {
      keys: ["todTitle.name"],
      threshold: 0.3,
    });
    res = todTitleFuse.search(filterProps.todTitle);
  }
  if (filterProps.status !== "") {
    flag = true;
    const statusFuse = new Fuse(res, {
      keys: ["status"],
      threshold: 0,
    });
    res = statusFuse.search(filterProps.status);
  }
  if (flag) {
    res = res.map((r) => {
      return r.item;
    });
  }

  console.log(res);
  dispatchFilteredProfiles({
    type: "ADD_NEW_DATA",
    newData: res,
  });
};
