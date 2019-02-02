import mongoose from "mongoose"


const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "text is required"
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
})

const model = mongoose.model("Commennt", CommentSchema)
export default model