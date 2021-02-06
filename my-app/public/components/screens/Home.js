import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    //allpost to server
    fetch("http://localhost:9000/allpost", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setData(result.posts);
      });
  }, []);
  //like post
  const likePost = (id) => {
    fetch("http://localhost:9000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((items) => {
          if (items._id == result._id || result.postedBy == items.postedBy) {
            return result;
          } else {
            return items;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //unlike post

  const unlikePost = (id) => {
    fetch("http://localhost:9000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((items) => {
          if (items._id == result._id || result.postedBy == items.postedBy) {
            return result;
          } else {
            return items;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //post comment
  const makeComment = (text, postId) => {
    fetch("http://localhost:9000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((items) => {
          if (items._id == result._id) {
            return result;
          } else {
            return items;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete post
  const deletePost = (postid) => {
    //allpost to server
    fetch(`http://localhost:9000/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((items) => {
          return items._id != result._id;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      {data.map((items) => {
        return (
          <div className="card home-card">
            <h5 style={{ padding: "5px" }}>
              <Link
                to={
                  items.postedBy._id !== state._id
                    ? "/Profile/" + items.postedBy._id
                    : "/Profile"
                }
              >
                {items.postedBy.name}
              </Link>
              {items.postedBy._id == state._id && (
                <i
                  className="material-icons"
                  style={{ float: "right" }}
                  onClick={() => {
                    deletePost(items._id);
                  }}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={items.photo} />
            </div>
            <div className="card-content">
              <i className="material-icons">favorite</i>
              {items.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikePost(items._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(items._id);
                    console.log(items);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{items.likes.length} likes</h6>
              <h6>{items.title}</h6>
              <p>{items.body}</p>
              {items.comments.map((record) => {
                return (
                  <h6>
                    <span style={{ fontWeight: "500" }}>
                      {record.postedBy.name}
                    </span>
                    <h7> </h7>
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, items._id);
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
