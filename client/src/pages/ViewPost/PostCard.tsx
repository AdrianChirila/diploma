export type Props = {
  header: string;
  content: string;
};

export const PostCard = ({ content, header }: Props) => {
  return (
    <>
      <div className="row">
        <div className="col s12 m7">
          <div className="card">
            <div className="card-image">
              <img src="images/sample-1.jpg" />
              <span className="card-title">Card Title</span>
            </div>
            <div className="card-content">
              <p>
                I am a very simple card. I am good at containing small bits of information. I am convenient because I
                require little markup to use effectively.
              </p>
            </div>
            <div className="card-action"></div>
          </div>
        </div>
      </div>
    </>
  );
};
