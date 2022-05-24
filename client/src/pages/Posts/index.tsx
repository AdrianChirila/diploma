import { useContext, useEffect, useState } from "react";
import { Loading } from "../../components/Loding";
import { AuthContext } from "../../context/Auth";
import { useHttp, useMessage } from "../../hooks";
import {Post} from "./Post"

type Posts = {
  id: string;
  img: string;
  title: string;
  description: string;
}[];

export const PostsList = () => {
  const { token } = useContext(AuthContext);
const message = useMessage()
  const { error, loading, removeError, request } = useHttp();
  const [posts, setPosts] = useState<Posts[] | undefined>(undefined);

  useEffect(() => {
    if (error) {
      message(error);
      removeError();
    }
  }, [error, message, removeError]);

  const getHandler = async () => {
    try {
      const response = await request({ url: "/posts", method: "GET", token: token as string });
       const parsedPosts=  response.map(({img,title,description,_id}:any)=>({img,title,description,id:_id}))
       setPosts(parsedPosts)

    } catch (error) {

    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>Something went wrong. Please reload the page</>;
  }

  return (
    <>
    
    {
    //@ts-expect-error
    posts?.map(({id,img,title,description    })=>(
<Post description={description} title={title} img={img} id={id} key={id}/>

    ))}
    </>
  );
};
