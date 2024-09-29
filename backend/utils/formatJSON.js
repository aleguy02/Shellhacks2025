const formatJSON = async (str) => {
    str = str.trim()
    const startIndex = str.indexOf("{")
    const endIndex = str.lastIndexOf("}") + 1
    formattedJSON = JSON.parse(str.slice(startIndex, endIndex))
    return formattedJSON
}

module.exports = formatJSON