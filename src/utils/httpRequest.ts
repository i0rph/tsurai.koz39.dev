import axios from 'axios';

interface IOption {
  type?: string;
  api?: boolean;
}
interface IObject {
  method: string;
  url: string;
  data?: object;
}

function setDefaultRequestOption(option: IOption) {
  option.type = option.type ?? 'application/json';
  option.api = option.api ?? true;

  return option;
}

async function request(object: IObject, requestOption = {}) {
  try {
    const option = setDefaultRequestOption(requestOption);

    const response = await axios.create({
      baseURL: import.meta.env.VITE_API_BASEURL ?? 'https://puyo.koz39.dev/',
      headers: {
        'Content-Type': option.type ?? 'application/json',
      },
    })(object);

    if (option.api && ![200, 204].includes(response.status)) {
      throw new Error(response.data);
    }

    return option.api ? response.data : response;
  } catch (e) {
    if (import.meta.env.VITE_DEV_LEVEL !== 'main') {
      console.error(e);
    }

    throw new Error(e);
  }
}

export default request;
