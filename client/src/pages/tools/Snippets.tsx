import { FormEvent, useEffect, useState } from 'react';
import WithSidebarLayout from '../../layouts/WithSidebarLayout';
import useApi, { Project } from '../../api/index';
import ProjectTile from '../../components/ProjectTile';
import { sideBarItems } from './sidebarItems';
import ProjectTilePlaceholder from '../../components/ProjectTilePlaceholder';

export default function Snippets() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>('');
  const apiService = useApi();

  const handleNewProject = (e: FormEvent) => {
    e.preventDefault();
    setName('');
    setShowForm(false);
    setLoading(true);
    apiService.createProject(name).then(() => {
      apiService.getProjects().then((data) => {
        setProjects(data);
        setLoading(false);
      });
    });
  };

  const deleteProject = (id: number) => {
    return apiService.destroyProject(id).then((result) => {
      apiService.getProjects().then(setProjects);
      return result;
    });
  };

  useEffect(() => {
    apiService.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, [apiService]);

  return (
    <WithSidebarLayout title="Tools" menuItems={sideBarItems} noMargin noBg>
      <div className="divide-y divide-gray-300 divide-solid bg-white rounded-md shadow-lg mb-4">
        {loading && <ProjectTilePlaceholder />}
        {projects.length === 0 && (
          <div className="py-4 px-6 text-gray-600">
            <h3 className="text-lg font-semibold mb-2">No Projects</h3>
            <p>
              You don't currently have any projects. Use the link below to
              create one.
            </p>
          </div>
        )}
        {projects?.map((project) => (
          <ProjectTile
            key={project.id}
            project={project.project}
            title={project.name}
            id={project.id}
            snippets={project.snippets}
            createdAt={new Date(project.createdAt)}
            deleteProject={deleteProject}
          />
        ))}
      </div>
      <div className="py-4 px-6 pt-4">
        {showForm ? (
          <div className="py-3 flex flex-row items-center">
            <form onSubmit={handleNewProject} className="contents">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mr-4 whitespace-nowrap"
              >
                Project Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="disabled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block flex-grow py-1 px-4 mr-4 border-2 border-gray-300 rounded focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-light focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 mr-3 text-sm font-medium rounded-md text-white bg-brand focus:outline-none focus:ring-4 focus:ring-brand-light focus:ring-opacity-50"
              >
                Create
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-rose-dark focus:outline-none focus:ring-4 focus:ring-rose-light focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className={`w-full h-full px-8 py-3  text-gray-400 text-2xl rounded-lg
                border-4 border-dashed border-gray-200
                hover:bg-brand-lighter hover:text-brand hover:border-brand
                focus:outline-none focus:bg-brand-lighter focus:text-brand focus:border-brand focus:ring-4 focus:ring-brand-light focus:ring-opacity-50`}
          >
            + New Project
          </button>
        )}
      </div>
    </WithSidebarLayout>
  );
}
