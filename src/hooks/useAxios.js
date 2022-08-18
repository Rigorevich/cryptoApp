import React from "react";
import axios from "axios";

const useAxios = ({ url }) => {
  const [response, setResponse] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(url);
        setResponse(result.data);
      } catch (error) {
        console.error(new Error(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return [response, isLoading];
};

export default useAxios;
