import React from "react";
import axios from "axios";

const useAxios = ({ url }) => {
  const [response, setResponse] = React.useState(undefined);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(url);
        setResponse(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return [response, error, isLoading];
};

export default useAxios;
