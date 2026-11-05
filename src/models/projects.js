import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, pr_location, pr_date
        FROM public.serviceProject;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllProjects };