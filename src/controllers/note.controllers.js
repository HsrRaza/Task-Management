import { ProjectNote } from "../models/note.models.js"
import { Project } from "../models/project.models.js"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/api-response.js"
import mongoose from "mongoose"

const getNote = async (req, res) => {
    const { projectId } = req.params

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    const notes = await ProjectNote.find({ project: projectId })
        .populate("createdBy", "username fullName")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, notes, "Notes fetched sucessfully"))

}
const getNoteById = async (req, res) => {
    // get note by id
    const { noteId } = req.params

    const note = await ProjectNote.findById(noteId).populate(
        "createdBy",
        "username fullName avatar"
    )
    if (!note) {
        throw new ApiError(404, "Note not found")
    }
    return res.status(200).json(
        new ApiResponse(200, note, "Note Fetched successfully")
    )


}
const createNote = async (req, res) => {
    // create Note
    const { projectId } = req.params
    const { content } = req.body

    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404, "project not found")
    }
    const note = ProjectNote.create({
        project: projectId,
        content,
        createdBy: req.user._id
    })

    const populatedNote = await ProjectNote.findById(note._id).populate(
        "createdBy",
        "username fullName avatar"
    )
    return res.status(200).json(
        new ApiResponse(200, populatedNote, "Note created  successfully")
    )


}

const updateNote = async (req, res) => {
    const { noteId } = req.params
    const { content } = req.body

    const existingNote = ProjectNote.findById(noteId)
    if (!existingNote) {
        throw new ApiError(404, "Note not found")
    }
    const note = ProjectNote.findByIdAndUpdate(
        noteId,
        { content },
        { new: true }
    ).populate(
        "createdBy", "username fullName avatar"
    )

    return res.status(200).json(
        new ApiResponse(200, note, "Note created  successfully")
    )
}

const deleteNote = async (req, res) => {
    const { noteId } = req.params
    const note = ProjectNote.findByIdAndDelete(noteId)
    
    if (!note) {
        throw new ApiError(404, "Note not found")
    }
    return res.status(200).json(
        new ApiResponse(200, note, "Note deleted   successfully")
    )
}

export {
    createNote,
    getNote,
    getNoteById,
    deleteNote
};