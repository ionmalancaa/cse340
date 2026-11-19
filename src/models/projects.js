import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, pr_location, pr_date
        FROM public.serviceProject;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          pr_location,
          pr_date
        FROM public.serviceProject
        WHERE organization_id = $1
        ORDER BY pr_date;
    `;
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
          p.project_id,
          p.title,
          p.description,
          p.pr_date AS date,
          p.pr_location AS location,
          p.organization_id,
          o.name AS organization_name
        FROM public.serviceProject p
        JOIN public.organization o
          ON p.organization_id = o.organization_id
        WHERE p.pr_date >= CURRENT_DATE
        ORDER BY p.pr_date ASC
        LIMIT $1;
    `;
    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
          p.project_id,
          p.title,
          p.description,
          p.pr_date AS date,
          p.pr_location AS location,
          p.organization_id,
          o.name AS organization_name
        FROM public.serviceProject p
        JOIN public.organization o
          ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);

    // Return the project, or null if no project has this ID
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
          p.project_id,
          p.title,
          p.description,
          p.pr_date AS date,
          p.pr_location AS location,
          p.organization_id,
          o.name AS organization_name
        FROM public.serviceProject p
        JOIN public.project_category pc
          ON p.project_id = pc.project_id
        JOIN public.organization o
          ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY p.pr_date;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId };