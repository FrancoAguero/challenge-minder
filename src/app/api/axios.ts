import axios, { AxiosResponse, AxiosInstance } from "axios";

interface ApiParamsI {
  endpoint: string;
}

type ParamsType<P = unknown> = P;

function apiInstance(customInstance: AxiosInstance) {
  return function (params: ApiParamsI) {
    return {
      get: async <T, D = ParamsType>(param?: D) => {
        const response = await customInstance.get(`/${params.endpoint}`, {
          params: param,
        });
        return response as AxiosResponse<T>;
      },
      post: async <T, D = ParamsType>(body: D) => {
        const response = await customInstance.post(`/${params.endpoint}`, body);
        return response as AxiosResponse<T>;
      },
      put: async <T, D = ParamsType>(body: D) => {
        const response = await customInstance.put(`/${params.endpoint}`, body);
        return response as AxiosResponse<T>;
      },
    };
  };
}

function createAxiosInstance(url: string) {
  const customInstance = axios.create({
    baseURL: url,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  });

  return apiInstance(customInstance);
}

export const axiosTodoListInstance = createAxiosInstance(
  "http://localhost:3000/"
);
