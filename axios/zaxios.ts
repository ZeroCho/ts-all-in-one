interface ZaxiosError<ResponseData> {
  response?: ZaxiosResponse<ResponseData>;
}
interface ZaxiosResponse<ResponseData> {
  data: ResponseData;
}
interface Config {
  url: string;
  method: string;
}
declare class ZAxios {
  constructor();
  get<ResponseData>(url: string): ZaxiosResponse<ResponseData>;
  post<ResponseData>(url: string, requestData: unknown): ZaxiosResponse<ResponseData>;
}
interface Zaxios extends ZAxios {
  <ResponseData>(config: Config): ZaxiosResponse<ResponseData>;
  isAxiosError<ResponseData>(error: unknown): error is ZaxiosError<ResponseData>;
  create(): Zaxios;
}
declare const zaxios: Zaxios;

interface Post {
  userId: number, id: number, title: string, body: string
}

(async() => {
  try {
    const res = await zaxios.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    console.log(res.data.userId);
    const res2 = await zaxios.post<Post>('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1, 
    });
    console.log(res2.data.id);
  } catch (error) {
    if (zaxios.isAxiosError<{ message: string }>(error)) {
      console.log(error.response?.data.message);
    }
  }
})();

// Axios
new ZAxios().get('www.gilbut.co.kr');

// AxiosInstance
zaxios({ url: 'www.gilbut.co.kr', method: 'get' });

// AxiosStatic
zaxios.create().get('www.gilbut.co.kr');