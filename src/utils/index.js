const isStr = function (value) {
  return typeof value === 'string' || value instanceof String
}

const strInObjVals = function (object, searchTerm) {
  if (!isStr(searchTerm)) return null
  const vals = Object.values(object)
  if (!object || !vals || vals.length === 0) return null
  return vals.some((val) => isStr(val) && val.toLowerCase().includes(searchTerm.toLowerCase()))
}

export { isStr, strInObjVals }
