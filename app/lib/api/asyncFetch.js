// @flow

// TODO: rewrite response error handling
const asyncFetch = async (url: string, options: RequestOptions): Promise<*> => {
  const response = await fetch(url, options);
  const { status } = response;
  const responseBody = await response.text();

  switch (status) {
    case 400:
    case 401:
    case 403:
      // throw new ClientApiError(statusText, status);
      return responseBody;
    case 422:
      // responseBody = await response.json();
      // throw new ValidationError(statusText, status, responseBody.errors);
      return responseBody;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
      // throw new ServerApiError(statusText, status);
      return responseBody;
    default:
      return responseBody;
  }
};

export default asyncFetch;
