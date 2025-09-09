import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function dateDisplay(date: string | Date) {
   // แปลงเวลาเป็น local timezone
   const localDate = dayjs.utc(date); //.tz("Asia/Bangkok");
   return localDate.format("DD/MM/YY HH.mm.ss");
}
export function datePassed(date: string | Date) {
   // แปลงเวลาเป็น local timezone
   const localDate = dayjs.utc(date);
   return localDate.fromNow();
}

// const datin = "2025-08-26 14:14:47.68668+00";
// console.log("datePassed: ", datePassed(datin));
// console.log("dateDisplay: ", dateDisplay(datin));
// console.log("dateDisplay: ", dateDisplay(datin).split(" "));
// console.log("dateDisplay: ", dateDisplay(datin).split(" ")[1]);
