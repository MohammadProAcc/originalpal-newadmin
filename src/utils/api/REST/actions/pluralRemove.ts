export const pluralRemove = async (
  entity: string,
  selections: any[],
  removeFunction: any,
  removeCallback: any,
  finalCallback: any,
  errorCallback: any,
) => {
  if (selections?.length > 0) {
    const deletions = selections?.map(async (id) => {
      const response = await removeFunction(id)

      if (response?.status === 'success') {
        removeCallback(entity, id)
      } else {
        errorCallback(id)
      }
    })

    await finalCallback([])
  }
}
