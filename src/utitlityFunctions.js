export const isValidateEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const isValidMobile = (mobile) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(mobile);
};

export const formatLocation = (location) => {
  let data = [];
  if (location?.country !== "") data.push(location?.country);
  if (location?.state !== "") data.push(location?.state);
  if (location?.city !== "") data.push(location?.city);
  return data.join(", ");
};

export const capitalizeFirstLetter = (s) => {
  if (s === undefined) {
    return "";
  } else {
    let a = s?.split(" ");
    for (let i = 0; i < a?.length; i++) {
      a[i] = a[i][0]?.toUpperCase() + a[i]?.substring(1).toLowerCase();
    }
    let aResult = a.join(" ");
    return aResult;
  }
};
