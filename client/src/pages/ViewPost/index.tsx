import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loading } from "../../components/Loding";
import { AuthContext } from "../../context/Auth";
import { useAuth, useHttp } from "../../hooks";

export const ViewPost = () => {
  const { request, loading, error } = useHttp();
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [header, setHeader] = useState(undefined);
  const [content, setContent] = useState(undefined);

  const getPost = useCallback(async () => {
    try {
      const response = await request({ url: `/posts/${id}`, method: "GET", token: token as string });
      const { header, content } = response;
      setContent(content);
      setHeader(header);
    } catch (error) {}
  }, [request, id, token]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (loading) {
    return <Loading />;
  }
  return <></>;
};
