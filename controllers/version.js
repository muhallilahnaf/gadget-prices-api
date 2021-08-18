const Version = require('../db/models/version')
const {getNewVersionName} = require('../helpers/version')

const create = (req, res) => {
    Version.find().sort({updatedAt: -1}).limit(1).lean().then(latestVersion => {
        if (latestVersion.length === 0) {
            const version = new Version({
                name: getNewVersionName()
            })
            version.save().then(newVersion => {
                return res.send(newVersion)
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while saving new version"
                })        
            })
        }
        const oldVersionName = latestVersion[0]['name']
        const version = new Version({
            name: getNewVersionName(oldVersionName)
        })
        version.save().then(newVersion => {
            res.send(newVersion)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving new version"
            })        
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving versions"
        })
    })
}


const findAll = (req, res) => {
    Version.find().lean().then(versions => {
        res.send(versions)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving versions"
        })
    })
}


const findOne = (req, res) => {
    const name = req.params.versionName
    if (!name) {
        return res.status(500).send({
            message: "info missing"
        })
    }
    Version.findOne({name}).lean().then(version => {
        res.send(version)
    }).catch(err => {
        return res.status(404).send({
            message: err.message
        })
    })
}


const findLatest = (req, res) => {
    Version.find().sort({updatedAt: -1}).limit(1).lean().then(version => {
        res.send(version)
    }).catch(err => {
        return res.status(404).send({
            message: err.message
        })
    })
}


module.exports = {
    create, findAll, findOne, findLatest
}