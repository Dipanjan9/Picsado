import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    //post to server
    fetch("http://localhost:9000/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        body,
        photo: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({
            html: "Please add all the fields",
            classes: "#c62828 red darken-3",
          });
        } else {
          M.toast({
            html: "Post Successfully Created",
            classes: "#4caf50 green",
          });
          history.push("/");
        }

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  const Postdetails = () => {
    //post to cloudinary
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Social-media");
    data.append("cloud_name", "dupataj1r");
    fetch("https://api.cloudinary.com/v1_1/dupataj1r/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "25px",
        marginTop: "30px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div class="file-field input-field">
        <div class="btn #f50057 pink accent-3">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #f50057 pink accent-3"
        onClick={() => {
          Postdetails();
        }}
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
