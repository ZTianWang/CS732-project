import express from 'express';
import { addEepost, deleteEepost, like, retrieveAllEepostList, retrieveEepostListByEntryId, updateEepost } from '../../data/post-data/eepostDao';

const router = express.Router();

const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

// Retrieve all posts
router.get('/getAll', async (req, res) => {
    res.json(await retrieveAllEepostList())
})

// Retrieve posts of single entry
router.get('/getByEntry', async (req, res) => {
    const { entry_id,pageNum } = req.query

    const eeposts = await retrieveEepostListByEntryId(entry_id,Number(pageNum))
    res.json(eeposts)
})

// Add new post
router.post('/add', async (req, res) => {
    // console.log('entry');
    const body = req.body
    const eepostDoc = {
        entry_id: body.entry_id,
        entry_title: body.entry_title,
        content: body.content,
        user_id: body.user_id,
        user_name: body.user_name
    }
    const newEepost = await addEepost(eepostDoc)

    res.header('Location', `/getByEntry/${newEepost.entry_id}`)
        .sendStatus(HTTP_CREATED)
})

//  Delete post
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    // console.log(id);
    const row = await deleteEepost(id)
    console.log(`${row.deletedCount} data deleted!`)
    res.sendStatus(HTTP_ACCEPTED)
})

// Update a post
router.post('/update', async (req, res) => {
    const { id, content } = req.body
    const result = await updateEepost(id, content)
    // console.log(result);
    if (result) {
        res.sendStatus(HTTP_ACCEPTED)
        console.log(`Data (_id:${result._id}) is updated!`)
    } else {
        res.sendStatus(HTTP_NOT_FOUND)
        console.log(`id:${id} not found!`);
    }
})

// Give a like
router.get('/like/:id', async (req,res) => { 
    const {id} = req.params
    const result = await like(id)
    if (result) {
        console.log(`Post ${result._id} got a like!`);
    } else {
        console.log(`${id} not found!`);
    }
    res.sendStatus(HTTP_NO_CONTENT)
 })

export default router;
