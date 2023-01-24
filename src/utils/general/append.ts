export function append(url: string, mode?: 'src' | 'med' | 'vid') {
  const prefix = mode
    ? mode == 'src'
      ? process.env['SRC']
      : mode === 'med'
      ? process.env['MED_SRC']
      : process.env['VID_SRC']
    : process.env['SRC']

  return `${prefix}/${url}`
}
