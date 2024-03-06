export const getFromDateToNow = (fromDate) => {
  const diff = new Date() - new Date(fromDate);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (months > 0) {
    return rtf.format(-months, "month");
  } else if (days > 0) {
    return rtf.format(-days, "day");
  } else if (hours > 0) {
    return rtf.format(-hours, "hour");
  } else if (minutes > 0) {
    return rtf.format(-minutes, "minute");
  } else {
    return rtf.format(-seconds, "second");
  }
};

export const getImagePath = (image) => {
  return `${import.meta.env.VITE_SERVER_URL}/${image}`;
};
