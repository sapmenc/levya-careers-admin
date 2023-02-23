import Fuse from "fuse.js";

export const filteredJobsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NEW_DATA":
      return [...action.newData];
  }
};

// Filter Jobs

export const filterjobs = (jobs, dispatchFilteredJobs, filterProps) => {
  let flag = false;
  let res = jobs;
  console.log("jobs :", res);
  if (filterProps.jobId !== "") {
    flag = true;
    const jobFuse = new Fuse(res, {
      keys: ["_id"],
      threshold: 0.5,
    });
    res = jobFuse.search(filterProps.profileId);
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
      findAllMatches: true,
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
  dispatchFilteredJobs({
    type: "ADD_NEW_DATA",
    newData: res,
  });
};
