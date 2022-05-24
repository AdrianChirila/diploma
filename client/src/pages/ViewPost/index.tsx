import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Loading } from "../../components/Loading";
import { AuthContext } from "../../context/Auth";
import { useHttp, useMessage, useSetTextFieldsActive } from "../../hooks";
import { UserType } from "../../types";
import { PostCard } from "./PostCard";

export const ViewPost = () => {
  useSetTextFieldsActive();
  const navigate = useNavigate();
  const message = useMessage();
  const { id } = useParams();
  console.log(id);

  const { request, loading, error } = useHttp();
  const { token, userType } = useContext(AuthContext);
  const [title, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");

  const getPost = useCallback(async () => {
    try {
      const response = await request({ url: `/posts/${id}`, method: "GET", token: token as string });
      const { title, content, img } = response;
      setContent(content);
      setHeader(title);
      setImg(img);
    } catch (error) {}
  }, [request, id, token]);

  const deletePost = useCallback(async () => {
    try {
      const response = await request({ url: `/posts/delete/${id}`, method: "DELETE", token: token as string });

      navigate("/");
    } catch (error) {}
  }, [request, id, token]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (loading) {
    return <Loading />;
  }
  return (
    <PostCard
      content={content}
      title={title}
      img={img}
      id={id as string}
      onDelete={deletePost}
      isAdmin={userType === UserType.Admin}
    />
  );
};
