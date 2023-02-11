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
    case "DELETE_EXPERIENCE":
      return state.filter((experience) => experience.id !== action.payload.id);
    default:
      return state;
  }
};

export const educationReducer = (state, action) => {
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
    case "DELETE_EDUCATION":
      return state.filter((education) => education.id !== action.payload.id);
    default:
      return state;
  }
};

export const defaultPreferredLocations = [
  {
    country: "",
    state: "",
    city: "",
  },
];

export const preferredLocationsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LOCATION":
      return [
        ...state,
        {
          country: "",
          state: "",
          city: "",
        },
      ];
    case "UPDATE_LOCATION":
      return state.map((location, i) => {
        if (i === action.index) {
          return {
            ...location,
            [action.field]: action.payload,
          };
        }
        return location;
      });
    default:
      return state;
  }
};
