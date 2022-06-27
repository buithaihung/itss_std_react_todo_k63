import React, { useState } from 'react'

/* ライブラリ */
import { uploadImage } from "../lib/firebase";

function Upload({ userImage, onSletctedImage }) {
  const [isModal, setIsModal] = useState(false);
  const active = isModal ? "is-active" : "";
  const [imageUrl, setImageUrl] = useState(userImage);

  const handleImage = async event => {
    const image = event.target.files[0];
    const imageUrl = await uploadImage(image);
    onSletctedImage(imageUrl);
    setImageUrl(imageUrl);
  };

  const handleClick = () => {
    setIsModal(!isModal);
  };

  const ImageViewer = () => {
    if (!imageUrl) {
      return <i class="fas fa-user"></i>
    } else {
      return (
        <div>
          <img src={imageUrl} alt=""/>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <div className={`modal ${active}`}>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="file is-boxed" >
            <label class="file-label">
              <input class="file-input" type="file" name="resume" onChange={handleImage} />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">画像を選択してください</span>
              </span>
            </label>
          </div>
          <button class="modal-close is-large" aria-label="close" onClick={handleClick}></button>
        </div>
      </div>
      <button onClick={handleClick} class="button is-primary is-inverted">
        <span class="icon">
          <ImageViewer />
        </span>
      </button>
    </div >
  );
}

export default Upload
