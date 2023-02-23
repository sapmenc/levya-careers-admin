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
  if (filterProps?.jobId !== "") {
    flag = true;
    const jobFuse = new Fuse(res, {
      keys: ["_id"],
      threshold: 0.5,
    });
    res = jobFuse.search(filterProps.jobId);
  }
  if (filterProps?.searchQuery !== "") {
    flag = true;
    const searchFuse = new Fuse(res, {
      keys: [
        "country",
        "_id",
        "domain.name",
        "title",
        "createdBy.name",
        "status",
      ],
      threshold: 0.2,
      findAllMatches: true,
    });
    res = searchFuse.search(filterProps.searchQuery);
  }
  if (filterProps?.domain !== "") {
    flag = true;
    const domainFuse = new Fuse(res, {
      keys: ["domain.name"],
      threshold: 0.3,
    });
    res = domainFuse.search(filterProps.domain);
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
