import React from "react";
import axios, { AxiosResponse } from "axios";
import { PriceAsset } from "../models";

const useAxios = ({ url }: { url: string }) => {
  const [response, setResponse] =
    React.useState<AxiosResponse<PriceAsset[], Object>>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(url);
        setResponse(result.data);
        console.log(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { response, isLoading };
};

export default useAxios;
