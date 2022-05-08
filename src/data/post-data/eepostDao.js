import Eepost from './eepostSchema'

async function retrieveAllEepostList() {
    return await Eepost.find()
}

async function addEepost(eepost) {
    const dbEepost = new Eepost(eepost)
    await dbEepost.save()
    return dbEepost
}

export {
    retrieveAllEepostList,
    addEepost
}