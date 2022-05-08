import express from 'express'

const router = express.Router()

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

router.get('/', async (req,res) => { 
    res.json(await retrievePostList())
 })