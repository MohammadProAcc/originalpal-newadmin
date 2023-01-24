export function preppend(url: string, by?: 'src' | 'med' | 'vid') {
  const prefix = by
    ? by == 'src'
      ? process.env['SRC']
      : by === 'med'
      ? process.env['MED_SRC']
      : process.env['VID_SRC']
    : process.env['SRC']

  return `${prefix}/${url}`
}
