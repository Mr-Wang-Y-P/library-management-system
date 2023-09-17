// 用于公告时间提交时格式转化
/**时间格式转化 */
export const format = (date) => {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }