import BadRequestError from "../errors/bad-request.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/not-found.js";
//=============== Job Handlers starts =================

// Handler to get all jobs
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

// Handler to get a single job
export const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({
        _id: jobId, createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job with ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

// Handler to create a new job
export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

// Handler to update an existing job
export const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req

    if (company === '' || position === '') {
        throw new BadRequestError('Coompany or Position fields cannot be empty!')
    }
    const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError(`No job with ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

// Handler to delete a job
export const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const job = await Job.findByIdAndDelete({
        _id:jobId,
        createdBy:userId,
    })
    if (!job) {
        throw new NotFoundError(`No job with ${jobId}`)
    }
    res.status(StatusCodes.OK).send({ msg: 'Job deleted successfully' })
}
//=============== Job Handlers ends =================

//=============== Export Handlers starts =================
const jobHandlers = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};

export default jobHandlers;
//=============== Export Handlers ends =================
