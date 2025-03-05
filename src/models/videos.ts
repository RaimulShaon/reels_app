import mongoose from "mongoose";

export const VideoDimentons = {
    width: 1080,
    height: 1920,
}as const;

export interface Video {
    _id?: mongoose.Types.ObjectId;
    Videourl: string;
    description: string;
    thumbnail: string;
    controls?: boolean;
    transformation: {
        width: number;
        height: number;
        quality?: number;
        crop?: string;
    }

}

const videoSchema = new mongoose.Schema<Video>({
    Videourl: {type: String, required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    controls: {type: Boolean, default: false},
    transformation: {
        height: {type: Number, default: VideoDimentons.height},
        width: {type: Number, default: VideoDimentons.width},
        quality: {type: Number, default: 100},
        crop: {type: String, default: "fill"},
    }
})

export const Video = mongoose.models.Video || mongoose.model<Video>("Video", videoSchema);