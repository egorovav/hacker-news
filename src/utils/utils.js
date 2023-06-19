export function unixToDate(unixTime) {
    const date = new Date(unixTime * 1000);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();
    return `${dd}/${mm}/${yy}`;
}