import content from "../data/content.json";

const useContent = () => {
  return {
    content,
    loading: false,
    error: null,
  };
};

export default useContent;