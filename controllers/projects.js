const { Projects } = require("../models");

const getProjectList = async (req, res) => {
    try {
        const { userId } = req;
        const { companyId } = req.query;

        const projectList = await Projects.getProjectInfoByUserCompanyId(userId, companyId);
        res.json(projectList);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error retrieving project list", error: error.message });
    }
};

const getProjectData = async (req, res) => {
    try {
        const { projectId } = req.query;

        const projectData = await Projects.getById(projectId);
        res.json(projectData);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching project data", error: error.message });
    }
};

const createOrEditProject = async (req, res) => {
    try {
        let { projectData } = req.body;

        if(projectData.appState.projectDetail.hasOwnProperty('projectId')) {
            //edit the company
            const projectId = projectData.appState.projectDetail.projectId;
            const projectDetail = await Projects.updateById(projectId, projectData);
            res.json(projectDetail);
        } else {
            //create a company
            const projectDetail = await Projects.create(projectData);
            res.json(projectDetail);
        }

    } catch (error) {
        res
            .status(500)
            .json({ message: "Error retrieving project", error: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.query;
        await Projects.deleteById(projectId);
        res.sendStatus(204);
        
        console.log(`Project ${projectId} successfully deleted.`);
    } catch (error) {
        console.error(`Error deleting project:`, error);
    }
}


module.exports = { getProjectList, getProjectData, createOrEditProject, deleteProject };
