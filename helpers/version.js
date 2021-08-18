const getNewVersionName = (name) => {
    const d = new Date()
    
    let month = `${d.getMonth() + 1}`
    let day = `${d.getDate()}`
    const year = `${d.getFullYear()}`

    month = month.length < 2 ? `0${month}` : month
    day = day.length < 2 ? `0${day}` : day

    const prefix = `${year}${month}${day}`

    if (name) {
        const nextCharCode = name.charCodeAt(name.length-1) + 1
        const suffix = String.fromCharCode(nextCharCode)
        
        return `${prefix}${suffix}`
    }
    return `${prefix}A`
}

module.exports = {
    getNewVersionName
}