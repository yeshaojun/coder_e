export function getFutureDate(days) {
  var currentDate = new Date();
  var futureDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);

  // 将日期格式化为字符串，例如 "YYYY-MM-DD"
  var formattedDate = formatDate(futureDate);

  return formattedDate;
}

function formatDate(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
