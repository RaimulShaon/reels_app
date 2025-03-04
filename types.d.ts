import { Connection } from "mongoose";

declare global {
    var mongoose: {
        conct: Connection | null;
        promise: Promise<Connection> | null;
    }
}

export {}