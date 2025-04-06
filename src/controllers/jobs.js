//=============== Job Handlers starts =================

// Handler to get all jobs
const getAllJobs = async (req, res) => {
    res.send('get all jobs');
}

// Handler to get a single job
const getJob = async (req, res) => {
    res.send('get job');
}

// Handler to create a new job
const createJob = async (req, res) => {
    res.send('create job');
}

// Handler to update an existing job
const updateJob = async (req, res) => {
    res.send('update job');
}

// Handler to delete a job
const deleteJob = async (req, res) => {
    res.send('register user'); // This should be 'delete job', not 'register user'
}
//=============== Job Handlers ends =================

//=============== Export Handlers starts =================
export default () => {
    // Exporting all job handlers to be used in the routes
    return {
        getAllJobs,
        getJob,
        createJob,
        updateJob,
        deleteJob
    }
}
//=============== Export Handlers ends =================
