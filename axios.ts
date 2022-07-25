import axios, {AxiosError, AxiosResponse} from "axios";

interface Post {
  userId: number, id: number, title: string, body: string
}

(async() => {
  try {
    const response = await axios.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response.data.userId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log((error.response as AxiosResponse<{ message: string }>).data.message);
    }
    const errorResponse = (error as AxiosError<{ message: string }>).response
  }
})();
