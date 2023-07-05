import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


export default class Test extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      x: 0,
      y: 0,
      width: 50,
      height: 50
    }
  };




  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
   
    );
  }
}





