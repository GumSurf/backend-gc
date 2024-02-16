import * as mongoose from 'mongoose';

export const TutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    keywords: [String],
}, {
    timestamps: true,
});
