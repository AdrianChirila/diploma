import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loading } from "../../components/Loading";
import { AuthContext } from "../../context/Auth";
import { useHttp, useMessage, useSetTextFieldsActive } from "../../hooks";

export const EditPost = () => {
  useSetTextFieldsActive();
  const message = useMessage();
  const { request, loading, error, removeError } = useHttp();
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const getPost = useCallback(async () => {
    try {
      const response = await request({ url: `/posts/${id}`, method: "GET", token: token as string });
      const { title, content, description, img } = response;
      setContent(content);
      setDescription(description);
      setTitle(title);
      setImg(img);
    } catch (error) {}
  }, [request, id, token]);

  useEffect(() => {
    if (error) {
      message(error);
      removeError();
    }
  }, [error, message, removeError]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const submitHandler = async () => {
    try {
      const response = await request({
        url: `/posts/edit/${id}`,
        method: "POST",
        body: {
          title,
          content,
          description,
          img,
        },
        token: token as string,
      });

      setContent(response.content);
      setTitle(response.title);
      setDescription(response.description);
      setImg(response.img);
      message("Created Post");
    } catch (error) {
      message(error as string);
    }
  };

  const onSetTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [setTitle]);
  const onSetDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value),
    [setDescription],
  );
  const onSetImg = useCallback((e: ChangeEvent<HTMLInputElement>) => setImg(e.target.value), [setImg]);
  const onSetContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value), [setContent]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            type="text"
            placeholder={"enter the post title"}
            name="title"
            id="title"
            value={title}
            onChange={onSetTitle}
          />
          <label htmlFor="title">Post Title</label>
        </div>

        <div className="input-field ">
          <textarea
            id="content"
            placeholder={"enter the post content"}
            className="materialize-textarea"
            value={content}
            onChange={onSetContent}
          />
          <label htmlFor="content">Post Content</label>
        </div>
        <div className="input-field ">
          <textarea
            id="description"
            placeholder={"enter the post description"}
            className="materialize-textarea"
            value={description}
            onChange={onSetDescription}
          />
          <label htmlFor="description">Post Description</label>
        </div>
        <div className="input-field ">
          <input
            id="image"
            type={"text"}
            placeholder={"enter the post Image"}
            className="materialize-textarea"
            value={img}
            onChange={onSetImg}
          />
          <label htmlFor="image">Post Image</label>
        </div>

        <div className="card-action center">
          <button className="btn grey" style={{ marginRight: 10 }} onClick={submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
