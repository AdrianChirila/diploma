import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { useHttp } from "../../hooks";

type Posts ={
    header:string;
    content:string;
}[]

export const PostsList = () => {
  const { token } = useContext(AuthContext);

    const { error, loading, removeError, request } = useHttp();
    const [posts, setPosts] = useState<Posts[]|undefined>(undefined)


    const getHandler = async () => {
        try {
          const response = await request({url:"/posts", method:"GET",token: token as string})
console.log(response);

        } catch (error) {}
      };
    
  useEffect(() => {
    getHandler()
  }, []);
  
  if (loading) {
    return <>Loading...</>;
  }

  if(error){
      return <>Something went wrong. Please reload the page</>
  }

  return <>
  sdfsdf</>;
};
