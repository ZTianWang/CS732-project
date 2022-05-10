import {Eepost} from '../schema'

async function retrieveAllEepostList() {
    return await Eepost.find()
}

async function addEepost(eepost) {
    const dbEepost = new Eepost(eepost)
    return await dbEepost.save()
}

//  paging query
async function retrieveEepostListByEntryId(entry_id,pageNum) {
    if (pageNum === 1) {
        const count = await Eepost.find({entry_id : entry_id}).count()
        const eeposts = await Eepost.find({entry_id : entry_id}).sort({createdAt:-1}).limit(10).populate('comments')
        return {count,eeposts}
    }
    return await Eepost.find({entry_id : entry_id}).sort({createdAt:-1}).skip(10*(pageNum-1)).limit(10).populate('comments')
}

async function deleteEepost(id) {
    return await Eepost.deleteOne({_id : id})
}

async function updateEepost(id, content) {
    return await Eepost.findByIdAndUpdate(id, {$set : {content : content}})
}

async function like(id) {
    return await Eepost.findByIdAndUpdate(id, {$inc : {like : 1}})
}

export {
    retrieveAllEepostList,
    addEepost,
    retrieveEepostListByEntryId,
    deleteEepost,
    updateEepost,
    like
}