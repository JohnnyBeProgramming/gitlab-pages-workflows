import { config, getStore, setStore } from "./config";

export const workflows = {
  projects: JSON.parse(getStore("workflow.projects") || "{}"),

  getConfig() {
    return config;
  },

  getProject(project_id) {
    return workflows.projects[project_id];
  },

  getRef() {
    return new URLSearchParams(window.location.search).get("branch");
  },

  isReady(project_id) {
    if (!project_id) return false;
    const found = workflows.projects[project_id];
    if (!found) return false;
    return !!config.token;
  },

  async saveProjects() {
    // Save to local storage
    setStore("workflow.projects", JSON.stringify(workflows.projects));
  },

  async checkResponse(response) {
    if (!response.ok) {
      // Custom message for failed HTTP codes
      const code = response.status;
      if (code === 404) throw new Error("404, Not found");
      if (code === 500) throw new Error("500, internal server error");
      // For any other server errors
      throw new Error(response.status);
    }

    return response;
  },

  async jsonResponse(response) {
    await this.checkResponse(response);
    return await response.json();
  },

  async errorResponse(ex) {
    if (ex?.message) {
      console.error(ex.message, ex);
    }
    throw ex;
  },

  async connect(project_id, token) {
    const req_url = `${config.apiURL}/api/v4/projects/${project_id}/`;
    const headers = { "PRIVATE-TOKEN": token };
    const metadata = await fetch(req_url, { headers })
      .then(workflows.jsonResponse.bind(this))
      .catch(workflows.errorResponse.bind(this));

    // Check for failures or aunauthorised
    if (!metadata) return null;

    console.debug("Connection success:", metadata);
    setStore("workflow.token", token);
    config.token = token;

    // Successfully got a response for the repository, persist details
    workflows.projects[project_id] = metadata;
    await workflows.saveProjects();

    return metadata;
  },

  async getTrigger(project_id) {
    if (!project_id) return false;
    return config?.triggers[project_id];
  },

  async setTrigger(project_id, trigger) {
    config.triggers[project_id] = trigger;
    return trigger;
  },

  async disconnect(project_id) {
    if (!project_id) return false;
    workflows.projects[project_id] = null;
    await workflows.saveProjects();
    return true;
  },

  async apiRequest(method, action, payload) {
    const token = config.token;
    const body = payload ? JSON.stringify(payload) : null;
    const headers = token ? { "PRIVATE-TOKEN": token } : {};
    const res = await fetch(action, { method, headers, body })
      .then(this.jsonResponse.bind(this))
      .catch(this.errorResponse.bind(this));
    return res;
  },

  async fetchPipelineInfo(project_id, pipeline_id) {
    const config = workflows.getConfig();
    const action = `${config?.apiURL}/api/v4/projects/${project_id}/pipelines/${pipeline_id}`;
    const headers = { "PRIVATE-TOKEN": config.token };
    const res = await fetch(action, { headers })
      .then(this.jsonResponse.bind(this))
      .catch(this.errorResponse.bind(this));
    return res;
  },

  async cancelPipeline(project_id, pipeline_id) {
    const trigger = await workflows.getTrigger(project_id);
    const token = trigger?.token;
    const action = `${config?.apiURL}/api/v4/projects/${project_id}/pipelines/${pipeline_id}/cancel`;
    const method = "POST";
    const headers = { "PRIVATE-TOKEN": config?.token };
    const res = await fetch(action, { method, headers })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return await workflows.fetchPipelineInfo(project_id, pipeline_id);
  },
};
