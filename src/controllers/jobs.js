import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
// import { BadRequestError, NotFoundError } from "../errors";
//=============== Job Handlers starts =================

// Handler to get all jobs
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

// Handler to get a single job
export const getJob = async (req, res) => {
    res.send('get job');
}

// Handler to create a new job
export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

// Handler to update an existing job
export const updateJob = async (req, res) => {
    res.send('update job');
}

// Handler to delete a job
export const deleteJob = async (req, res) => {
    res.send('register user'); // This should be 'delete job', not 'register user'
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
