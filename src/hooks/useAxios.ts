import React from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const useAxios = ({ url }: { url: string }) => {
  const [response, setResponse] = React.useState<AxiosResponse>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(url);
        setResponse(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { response, isLoading };
};

export default useAxios;
