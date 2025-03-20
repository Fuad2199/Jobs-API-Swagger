import express from "express";
const router = express.Router()

import {
    getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
} from "../controllers/jobs"

router.route('/').post(createJobs).get(getAllJobs)
router.route('/:id').get(getJobs).delete(deleteJobs).patch(updateJobs)

export default router
