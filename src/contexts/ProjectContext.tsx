'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Project = {
    id: string;
    name: string;
    repo: string;
    status: string;
    last_deploy: string;
    health: string;
};

type ProjectContextType = {
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
    projects: Project[];
    loading: boolean;
    refreshProjects: () => Promise<void>;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProjects(data);
                // Optionally select the first one by default, or leave null for "All"
                // setSelectedProject(data[0]); 
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ selectedProject, setSelectedProject, projects, loading, refreshProjects: fetchProjects }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
}
