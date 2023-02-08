import PostModel from "../models/Post.js"

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can`t get posts"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId,

            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: "after",
            },
            (err, doc) => {
                if (err) {
                    console.log(error);
                    return res.status(500).json({
                        message: "Can`t get one post"
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: "Didn`t find any post"
                    })
                }
                res.json(doc)
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can`t get posts"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(error);
                    return res.status(500).json({
                        message: "Can`t delete post"
                    });
                }
                if (!doc) {

                    return res.status(404).json({
                        message: "Didn`t find post"
                    });
                }
                res.json({
                    success: true,
                })


            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can`t get posts"
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can`t create post"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        )
        res.json({
            success: true,
        })
    } catch (err) {
        console.log(error);
        res.status(500).json({
            message: "Can`t update post"
        })
    }
}