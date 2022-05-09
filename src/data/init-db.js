import mongoose from 'mongoose'
import {Eepost,Comment} from './schema'
import { addEepost } from './post-data/eepostDao';

main()

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/wnwn', { useNewUrlParser: true })

        console.log('Connected to database!');
        console.log();

        await clearDatabase();
        console.log();

        await addPosts();
        console.log();

        await addComment()
    } catch (err) {
        console.log('Err occurs!');
        console.log(err.stack);
    } finally {
        // Disconnect when complete
        await mongoose.disconnect();
        console.log('Disconnected from database!');
    }
}

async function clearDatabase() {
    const postDeleted = await Eepost.deleteMany({});
    console.log(`Cleared database (removed ${postDeleted.deletedCount} posts).`);
}

var pid
async function addPosts() {
    for (let i = 0; i < 10; i++) {
        let id
        if (i % 2 === 0) {
            id = 1
        }else{
            id = 2
        }
        let eepost = {
            entry_id: `Entry-id-${id}`,
            entry_title: `Entry-title-${id}`,
            content: `This is the entry ${i+1}`,
            user_id: `user-id-${id}`,
            user_name: `user-${id}`
        }
        const dbPost = await addEepost(eepost)
        if (i === 0) {
            pid = dbPost._id
        }
        console.log(`The post${id} add to db (_id = ${dbPost._id})`);
    }
}

async function addComment() {
    for (let i = 0; i < 5; i++) {
        let comment = {
            eepost_id : pid,
            content : `Comment-${i+1}`
        }
        const result = await new Comment(comment).save();
        await Eepost.findByIdAndUpdate(pid,{$push: {comments:result._id}})
        console.log(`The comment add to db (_id = ${result._id})`);
    }
}