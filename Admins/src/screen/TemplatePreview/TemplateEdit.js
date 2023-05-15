import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import axios from "axios";
import { Buffer } from "buffer";
import { useParams } from "react-router-dom";

const TemplateEdit = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [allImages, setAllImages] = useState([]);
  const [templateJson, setTemplateJson] = useState();
  const { templateId } = useParams();
  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    const rectangle = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
    });
    editor?.canvas?.add(rectangle);
  };
  const deleteAll = () => {
    setAllImages([]);
    editor?.deleteAll();
  };
  const setFillColor = (e) => {
    editor?.setFillColor(e.target.value);
  };

  const addImage = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);
    setAllImages([...allImages, e.target.files[0]]);
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.setAttribute("crossOrigin", "anonymous");
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        editor.canvas.centerObject(image);
        image.set({
          scaleX: editor?.canvas.getWidth() / image.width / 2,
          scaleY: editor?.canvas.getHeight() / image.height / 2,
          top: 0,
          left: 0,
          srcFromAttribute: true,
        });
        image.name = e.target.files[0].name;
        editor.canvas.add(image);
        editor?.canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const addText = () => {
    const text = new fabric.Textbox("text", {
      editable: true,
    });
    editor?.canvas?.add(text);
  };
  const layerDown = () => {
    editor?.canvas?.sendBackwards(selectedObjects[0]);
    editor?.canvas?.sendToBack(selectedObjects[0]);
    editor?.canvas.discardActiveObject();
  };
  const layerUp = () => {
    console.log(selectedObjects);
    editor?.canvas?.bringForward(selectedObjects[0]);
    editor?.canvas?.bringToFront(selectedObjects[0]);
    editor?.canvas.discardActiveObject();
  };
  const deleteSelected = () => {
    console.log(selectedObjects[0].get("type") === "image");
    if (selectedObjects[0] && selectedObjects[0].get("type") === "image") {
      console.log(selectedObjects[0].name);
      setAllImages(
        allImages.filter((file) => file.name !== selectedObjects[0].name)
      );
    }
    editor?.deleteSelected();
  };
  const setBackgroundImage = (e) => {
    const reader = new FileReader();
    setAllImages([...allImages, e.target.files[0]]);
    // set background image options
    var bgImgOptions = {
      // set the background color to white
      backgroundColor: "red",
      // set the scaling mode to "cover"
      backgroundScaleMode: "cover",
    };
    // load the background image
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.setAttribute("crossOrigin", "anonymous");
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.name = e.target.files[0].name;
        // set the image as the background of the canvas
        editor?.canvas?.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas),
          bgImgOptions
        );
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const getTemplateJson = async () => {
    try {
      const { data } = await axios.get(`/template/${templateId}`);
      setTemplateJson(data.template.templateJson);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    editor?.canvas?.setDimensions({ height: 600, width: 900 });
  }, [editor]);

  useEffect(() => {
    editor?.canvas.loadFromJSON(templateJson);
  }, [templateJson]);
  useEffect(() => {
    getTemplateJson();
  }, []);
  async function saveTemplate(file) {
    try {
      fabric.Image.prototype.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            name: this.name,
            src: `http://192.168.29.249:8085/template/sendImage/${this.name}`,
          });
        };
      })(fabric.Image.prototype.toObject);
      const formData = new FormData();
      formData.append("name", "badhiya template");
      formData.append("description", "arre bahut badhiya template hai");
      formData.append("templateJson", JSON.stringify(editor?.canvas.toJSON()));
      formData.append("previewImage", file);
      console.log(formData);
      const response = await axios.patch(`/template/${templateId}`, formData);
      console.log(editor?.canvas.toJSON());
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const uploadImage = async (e) => {
    try {
      const formData = new FormData();
      allImages.forEach((v) => {
        console.log(v);
        formData.append("image", v);
      });
      const res = await axios.post("/template/saveImage", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getPreviewImage = async () => {
    const canvasPng = editor?.canvas.toDataURL({
      format: "png",
    });

    // Making file object from the base64 string
    function dataURLtoFile(dataurl, filename) {
      const uint8Buffer = Buffer.from(dataurl.split(",")[1], "base64");
      return new File([uint8Buffer], filename, { type: "image/png" });
    }

    // Usage example:
    var file = dataURLtoFile(canvasPng, "previewImage.png");
    saveTemplate(file);
  };
  return (
    <div>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={deleteAll}>Delete all</button>
      <button onClick={addText}>Add Text</button>
      <button onClick={layerDown}>Layer Down</button>
      <button onClick={layerUp}>Layer Up</button>
      <button onClick={deleteSelected}>Delete</button>
      <button onClick={uploadImage}>Upload Images</button>
      <button onClick={getPreviewImage}>Preview Image</button>
      <label htmlFor="img">Add Image</label>
      <input
        type="file"
        id="img"
        accept="image/png, image/jpeg ,image/jpg"
        onChange={addImage}
      ></input>
      <label htmlFor="img">Add Background Image</label>
      <input
        type="file"
        id="img"
        accept="image/png, image/jpeg ,image/jpg"
        crossOrigin="anonymous"
        onChange={setBackgroundImage}
      ></input>
      <label htmlFor="favcolor">Select your favorite color:</label>
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        // value=
        onChange={setFillColor}
      ></input>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
};
export default TemplateEdit;
