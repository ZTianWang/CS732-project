import mongoose from 'mongoose'
import Eepost from './post-data/eepostSchema'
import { addEepost } from './post-data/eepostDao';

main()

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/wnwn', { useNewUrlParser: true })

        console.log('Connected to database!');
        console.log();

        // await clearDatabase();
        // console.log();

        await addArticles();
        console.log();
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
    const articlesDeleted = await Article.deleteMany({});
    console.log(`Cleared database (removed ${articlesDeleted.deletedCount} articles).`);
}

async function addArticles() {
    for (let i = 0; i < 10; i++) {
        let eepost = {
            entry_id: `Entry-id-${i}`,
            entry_title: `Entry-title-${i}`,
            content: `This is the entry ${i}`,
            user_id: `user-${i}`
        }
        const dbPost = await addEepost(eepost)
        console.log(`The post${i} add to db (_id = ${dbPost._id})`);
    }

}