import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { storage } from "./firebase/firebase";

function App() {
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState();

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    console.log(imageAsFile);
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl(fireBaseUrl);
            console.log(imageAsUrl);
          });
      }
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container-fluid">
        <div className="row mt-3 justify-content-center">
          <div className="card w-50 mt-5 shadow-lg">
            <div className="card-header text-center bg-white">
              <h3>File Upload in react with firebase</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleFireBaseUpload}>
                <div className="input-group">
                  <input
                    onChange={handleImageAsFile}
                    type="file"
                    className="form-control"
                    accept="image/*"
                    required
                  />
                </div>
                <br />
                <div className="justify-content-center input-group">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
              <br />
              <div className="row text-center justify-content-center d-flex">
                {imageAsUrl && (
                  <>
                  <h5>Uploaded Image :-</h5>
                  <img
                    src={imageAsUrl}
                    style={{ height: "250px", width: "250px" }}
                  />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
