import axios from 'axios';
import toast from 'solid-toast';

function setDefaultRequestOption(option) {
  option.type = option.type ?? 'application/json';
  option.api = option.api ?? true;

  return option;
}

async function request(object, requestOption = {}) {
  try {
    const option = setDefaultRequestOption(requestOption);

    const response = await axios.create({
      baseURL: import.meta.env.VITE_API_BASEURL ?? 'https://api.koz39.dev/',
      headers: {
        'Content-type': option.type ?? 'application/json',
      },
    })(object);

    if (option.api && ![200, 204].includes(response.status)) {
      toast.error('요청 처리 중 오류가 발생했습니다.');
      throw new Error(response.data);
    }

    return option.api ? response.data : response;
  } catch (e) {
    if (import.meta.env.VITE_DEV_LEVEL !== 'main') {
      console.error(e);
    }

    const error = e.response?.data ? e.response.data : e;

    toast.error('요청 처리 중 오류가 발생했습니다.');
    throw new Error(error.error);
  }
}

export default request;
