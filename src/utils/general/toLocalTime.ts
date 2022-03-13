export const toLocalTime = (date: string) => {
  const d = new Date(date)
  return d.toLocaleTimeString('fa-IR')
}
