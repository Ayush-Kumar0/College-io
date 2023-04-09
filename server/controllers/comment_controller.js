const User = require('../models/user');
const College = require('../models/college');
const Feed = require('../models/feed');
const Comment = require('../models/comment');

module.exports.create = (req, res) => {
    const newComment = new Comment({
        commenter: req.user.id,
        feed: req.body.feed_id,
        comment: req.body.comment
    });

    User.findById(req.user.id)
        .then(user => {
            // Saving comment in users database
            user.comments.push(newComment.id);
            user.save()
                .then(user => {
                    console.log('Comment saved in users database');
                    Feed.findById(req.body.feed_id)
                        .then(feed => {
                            // Saving comment in feed database
                            feed.comments.push(newComment.id);
                            feed.save()
                                .then(feed => {
                                    console.log('Comment saved in feeds database');
                                    // Saving comment in comments database
                                    newComment.save()
                                        .then(newComment => {
                                            console.log('Comment saved in comments database');
                                            // Sending comments info to client
                                            return res.status(200).json({ comment_id: newComment.id });
                                        })
                                        .catch(err => {
                                            console.log('Error while saving comment in comments database\n', err);
                                            res.status(401).json({});
                                        });
                                })
                                .catch(err => {
                                    console.log('Error while saving comment in feeds database\n', err);
                                    res.status(500).json({});
                                });
                        })
                        .catch(err => {
                            console.log('Error while finding feed\n', err);
                            res.status(500).json({});
                        });
                })
                .catch(err => {
                    console.log('Error while saving comment in users database\n', err);
                    res.status(500).json({});
                });
        })
        .catch(err => {
            console.log('Error while finding user\n', err);
            res.status(401).json({});
        });
}