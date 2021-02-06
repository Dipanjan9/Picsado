import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (url) {
      UploadFields();
    }
  }, [url]);

  const UploadPic = () => {
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

  const UploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "Invalid Email",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    fetch("http://localhost:9000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
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
            html: "Sucessfully Saved",
            classes: "#4caf50 green",
          });
          history.push("/login");
        }

        console.log(data);
      });
  };

  // const UploadPic = () => {
  //   //post to cloudinary
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "Social-media");
  //   data.append("cloud_name", "dupataj1r");
  //   fetch("https://api.cloudinary.com/v1_1/dupataj1r/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUrl(data.url);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const Postdata = () => {
    if (image) {
      UploadPic();
    } else {
      UploadFields();
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h1 className="brand-logo">Picsado </h1>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div class="file-field input-field">
          <div class="btn #f50057 pink accent-3">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #f50057 pink accent-3"
          onClick={() => Postdata()}
        >
          SignUp
        </button>
        <p>
          <Link to="/Login">Already have an acoount ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
