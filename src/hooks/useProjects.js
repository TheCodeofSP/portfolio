import { useEffect, useState } from "react";

const initialProjects = {
  formations: [],
  personnels: [],
  professionnels: [],
};

const useProjects = (jsonPath = "/src/data/projects.json") => {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(jsonPath);

        if (!response.ok) {
          throw new Error("Erreur de chargement des projets");
        }

        const data = await response.json();

        if (!isCancelled) {
          setProjects({
            formations: data.formations || [],
            personnels: data.personnels || [],
            professionnels: data.professionnels || [],
          });
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isCancelled = true;
    };
  }, [jsonPath]);

  

  return { projects, loading, error };
};


export default useProjects;
