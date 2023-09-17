export const addDays = (date, days) => {
  var result = new Date(date.getTime());
  result.setDate(date.getDate() + days);
  return result;
}
export const deleteDays = (date, date1) => {
  var oldDate = new Date(date);
  var newDate = new Date(date1);
  var diff = newDate - oldDate; // 计算差值（毫秒级）  
  var result = Math.floor(diff / (1000 * 60 * 60 * 24));
  return result;
}
// export const getDaysDiff = (date1, date2) => {
//   var diff = date2.getTime() - date1.getTime();
//   return Math.ceil(diff / (1000 * 60 * 60 * 24));
// }
export const formatDate = (dateStr) => {
  // 将输入日期字符串转换为 Date 对象  

  // 将输入日期格式化为 YYYY-MM-DD HH:mm:ss 格式  
  var formattedDate = dateStr.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // 将日期和时间字符串拆分为单独的日期和时间部分  
  var dateParts = formattedDate.split(' ');
  var date = dateParts[0];
  var time = dateParts[1];

  // 将时间部分替换为 00:00:00  
  // var formattedTime = '00:00:00';  
  var formattedDateTime = date + ' ' + time;

  return formattedDateTime;
}  
export const formatDateString=(dateStr) =>{  
  // 将输入日期字符串转换为 Date 对象  
  var inputDate = new Date(dateStr);  
  
  // 将输入日期格式化为 YYYY-MM-DD HH:mm:ss 格式  
  var formattedDate = inputDate.toLocaleString('zh-CN', {  
    year: 'numeric',  
    month: '2-digit',  
    day: '2-digit',  
    hour: '2-digit',  
    minute: '2-digit',  
    second: '2-digit',  
    hour12: false,  
    timeZone: 'GMT+0800' // 设置时区为 GMT+0800  
  });  
  
  return formattedDate;  
}