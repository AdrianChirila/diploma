import { useState, useCallback, ChangeEvent } from "react";

export const CreatePost = () => {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  const onSetHeader = useCallback((e: ChangeEvent<HTMLInputElement>) => setHeader(e.target.value.trim()), [setHeader]);
  const onSetContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value.trim()),
    [setContent],
  );

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            type="text"
            placeholder={"enter the post header"}
            name="title"
            id="title"
            value={header}
            onChange={onSetHeader}
          />
          <label htmlFor="title">Post Header</label>
        </div>

        <div className="input-field col s12">
          <textarea
            id="content"
            placeholder={"enter the post content"}
            className="materialize-textarea"
            value={content}
            onChange={onSetContent}
          />
          <label htmlFor="content">Post Content</label>
        </div>
      </div>
    </div>
  );
};
