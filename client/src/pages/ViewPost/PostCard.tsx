import { Link } from "react-router-dom";

export type Props = {
  id: string;
  isAdmin: boolean;
  img: string;
  title: string;
  content: string;
  onDelete: () => void;
};

export const PostCard = ({ content, title, img, isAdmin, id, onDelete }: Props) => {
  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="col s12 m7">
        <div className="card horizontal">
          <div className="card-image">
            <img style={{ height: "15rem", width: "15rem" }} alt="post image" src={img} />
          </div>
          <div className="card-stacked">
            <h3 style={{ marginLeft: "1.5rem" }} className="header">
              {title}
            </h3>
            <div className="card-content">
              <p>{content}</p>
            </div>
            {isAdmin && (
              <div className="card-action">
                <Link to={`/posts/edit/${id}`}>Edit Post</Link>

                <button className="btn grey" style={{ marginRight: 10 }} onClick={onDelete}>
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
