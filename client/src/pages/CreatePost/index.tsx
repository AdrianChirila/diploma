import { useState, useCallback, ChangeEvent, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import { useHttp, useMessage, useSetTextFieldsActive } from "../../hooks";

export const CreatePost = () => {
  useSetTextFieldsActive();

  const { request, loading, error,removeError } = useHttp();
  const message = useMessage()
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const onSetTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [setTitle]);
  const onSetDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value),
    [setDescription],
  );
  const onSetImg = useCallback((e: ChangeEvent<HTMLInputElement>) => setImg(e.target.value), [setImg]);
  const onSetContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value), [setContent]);

  useEffect(() => {
    if (error) {
      message(error);
      removeError();
    }
  }, [error, message, removeError]);
  
  const submitHandler = async () => {
    try {
      const response = await request({
        url: "/posts/create",
        method: "POST",
        body: {
          title,
          content,
          description,
          img,
        },
        token: token as string,
      });

      setContent(response.content)
      setTitle(response.title)
      setDescription(response.description)
      setImg(response.img)
      message("Created Post");


    } catch (error) {
      message(error as string);

    }
  };

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
