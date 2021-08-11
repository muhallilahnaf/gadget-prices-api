
// input validation
const validation = (q, shops) => {

    if (q.value === '') return false
    if (shops.length === 0) return false

    return { q, shops }
}

module.exports = { validation }
