import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypic, setMypic] = useState([]);
  const [image, setImage] = useState("");
  // const [url, setUrl] = useState("");
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:9000/mypost", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setMypic(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
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
          // setUrl(data.url);
          // console.log(data);
          // localStorage.setItem(
          //   "user",
          //   JSON.stringify({ ...state, pic: data.url })
          // );
          // dispatch({ type: "UPDATEPIC", payload: data.url });
          //window.location.reload();
          fetch("http://localhost:9000/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const UpdatePhoto = (file) => {
    //post to cloudinary
    setImage(file);
  };

  return (
    <div style={{ maxWidth: "750px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : "Loading"}
          />
          <div class="file-field input-field">
            <div class="btn #f50057 pink accent-3">
              <span>Upload Image</span>
              <input
                type="file"
                onChange={(e) => UpdatePhoto(e.target.files[0])}
              />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <div>
          <h1>{state ? state.name : "Loading"}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{mypic.length} posts</h6>
            <h6>{state.followers.length} followers</h6>
            <h6>{state.following.length} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypic.map((item) => {
          return (
            <img
              className="items"
              key={item._id}
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
