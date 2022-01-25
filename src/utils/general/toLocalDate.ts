export const toLocalDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString('fa-IR')
}
