import express from "express";

import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} from "../controllers/jobs.js"; // .js uzantısını mütləq yaz!

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

export default router;
