export const toLocalTime = (date: string) => {
  const d = new Date(date)
  const finalTime = d.toLocaleTimeString('fa-IR')

  if (finalTime === "Invalid Date") {
    return "";
  } else {
    return finalTime;
  }
}
