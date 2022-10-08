export const toLocalDate = (date: string) => {
  const d = new Date(date)
  const finalDate = d.toLocaleDateString('fa-IR');
  if (finalDate === "Invalid Date") {
    return "";
  } else {
    return finalDate;
  }
}
