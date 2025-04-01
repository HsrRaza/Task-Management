import mongoose, { Schema } from "mongoose";

const projectNoteSchema = new Schema({})


export const ProjectNote= mongoose.model("ProjectNote", projectNoteSchema);