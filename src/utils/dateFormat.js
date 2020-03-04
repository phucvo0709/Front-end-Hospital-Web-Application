export function dateFormat(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    time = d.toLocaleTimeString();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return time + " " + [day, month, year].join("/");
}
