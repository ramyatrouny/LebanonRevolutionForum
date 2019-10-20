var express = require('express');
var router = express.Router();
var Posts = require('../models/posts');
var httpCodes = require('http-status-codes');
var moment = require('moment');
const requestip = require('request-ip');

const { check, validationResult } = require('express-validator');

router.get('/', [
    check('count', 'Add how many counts per page'),
    check('page', 'Page number')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(httpCodes.BAD_REQUEST).json(errors.array());
    }

    let { page, count } = req.body;

    count = parseInt(count);
    page = parseInt(page);

    const posts = await Posts.find().limit(count).skip(page * count).sort({ createdAt: -1 });

    const totalPosts = await Posts.count();

    return res.status(httpCodes.OK).json({
        status: 'success',
        posts,
        totalPosts
    });

});

router.post('/latest', async (req, res) => {
    const posts = await Posts.find().limit(50).sort({ createdAt: -1 });

    return res.status(httpCodes.OK).json({
        status: 'success',
        posts,
    });
})

router.post('/addPost', [
    check('post', 'add post').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(httpCodes.BAD_REQUEST).json(errors.array());
    }

    const { post } = req.body;
    const ipAddress = requestip.getClientIp(req);

    try {

        // Check the current ip address last post time 
        let findPost = await Posts.findOne({ ipAddress }).sort({ createdAt: -1 });

        if (findPost) {
            let currentTime = moment(Date.now());
            let end = findPost.createdAt;

            let dur = moment.duration(currentTime.diff(end));
            let duration = dur.asMinutes();

            
           if (duration < 60) {
               return res.status(httpCodes.BAD_REQUEST).json({
                   status: 'error',
                   msg: 'Only 1 Post per hour'
               })
           }

        }


        let newPost = new Posts({ post, ipAddress });
        await newPost.save();

        return res.status(httpCodes.OK).json({ status: 'success', newPost });

    } catch (error) {
        console.log(error);
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json('Server Error');
    }
});

module.exports = router;
