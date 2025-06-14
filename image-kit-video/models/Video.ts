import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
    height: 1080,
    width: 1080
} as const;

export interface IVideo {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: string;
    transformation: {
        height: number;
        width: number;
        quality?: boolean
    }
}


const videoSchema = new Schema<IVideo>({
    _id: mongoose.Types.ObjectId,
    title: { type: String, requied: true },
    description: { type: String, requied: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
        height: { type: Number, default: VIDEO_DIMENSIONS.height },
        width: { type: Number, default: VIDEO_DIMENSIONS.width },
        quality: { type: Number, min: 1, max: 100 }
    }
})

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;