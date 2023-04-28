import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ATemplateDetails } from "../redux/action/adminAction";
import { useEffect, useState } from "react";
import FontFaceObserver from "fontfaceobserver";



const EditScreen = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { editor, onReady } = useFabricJSEditor();

  const adminTemplateDetails = useSelector((state) => state.adminTemplateDetails);
  const { template, loading, error } = adminTemplateDetails

  const [color, setColor] = useState("")
  const [font, setFont] = useState("");
  console.log(font);
  const changeFont = async (e) => {
    setFont(e.target.value);
    await loadAndUse(font);
   
      // editor.canvas.getActiveObject().setFont(font);
      editor.canvas.renderAll();

    // addBold(font)
    // additalic(font)
    editor.canvas.renderAll()
  };
  async function loadAndUse(font1) {
    var myfont = new FontFaceObserver(font1);
    myfont
      .load()
      .then(function () {
        // editor.canvas.getActiveObject().setFont(font1)
     
          editor.canvas.getActiveObject().setFontFamily(font1);
   
        // .fontFamily = font1;
        // o.set(font1)
        editor.canvas.requestRenderAll();
        // editor.canvas.renderAll()
      })
      .catch(function (e) {
        console.log(e);
        // alert("font loading failed " + font1);
      });
  }
  // console.log(template)

  // let data = templateInfo
  // console.log(data)


  const addText = () => {
    const object = new fabric.IText('Text Message')
    editor.canvas.add(object);
    // const textbox = new fabric.Textbox('Test text', {
    //   left: 50,
    //   top: 50,
    //   width: 150,
    //   fontSize: 20,
    //   styles: {
    //     // first line of text i.e Test
    //     0: {
    //       //first letter of first line i.e T
    //       0: { fontFamily: 'Arial'},
    //       //second letter of first line i.e e
    //       1: { fontFamily: 'Impact'}
    //     },
    //   }
    // });
    // editor.canvas.add(textbox)
  }

  // const _onReady = (e) => {
  //   fabric.Image.fromURL(
  //     "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  //     function (oImg) {
  //       editor.canvas.backgroundImage = oImg
  //       editor.canvas.renderAll(oImg);
  //     }
  //   );
  // };



  // const _onReady = () => {
  //   settngImage(
  //     "https://www.quickanddirtytips.com/sites/default/files/styles/article_main_image/public/images/19571/astronaut-in-space-compressor.png?itok=3xPZVjBk",
  //   );
  // };

  const _onReady = async (canvas) => {
  
    fabric.Image.fromURL(`data:image/*;base64,${template.backgroundimage} `,(img) => {
      // fabric.Image.fromURL('https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',(img) => {
      img.scale(0.2)
      // canvas.add(img)
      // canvas.backgroundImage = img
      canvas.set("backgroundImage", img)
      // canvas.add(img)
      // canvas.setBackgroundImage(img);
      // canvas.getActiveObject(data)
      canvas.renderAll()
      // onloadeddata(img)
      onReady(canvas,`data:image/*;base64,${template.backgroundimage} `)
    })
    // canvas.setDimensions({
    //   width: 100,
    //   height: 800,
    // })
    // canvas.renderAll()
    // onloadeddata(img)
    // canvas.renderAll()

    // onReady(canvas)
  }

  const changeColor = (e) => {
    setColor(e.target.value);
    console.log(color);
    const o = editor.canvas.getActiveObject();
    o.set("fill", color);
    editor?.setStrokeColor(color);
    editor.canvas.renderAll();
  };

  const addBold = (i) => {
    const object = new fabric.IText('Text Message Bold')
    // editor.canvas.add(object);
    // const o = editor.canvas.getActiveObject();
    object.set("fontWeight", "bold");
    // object.set("fontStyle", "italic")
    editor.canvas.add(object);
    editor.canvas.renderAll();
  };

  const additalic = (i) => {
    const object = new fabric.IText('Text Message Bold')
    // editor.canvas.add(object);
    // const o = editor.canvas.getActiveObject();
    // object.set("fontWeight", "bold");
    object.set("fontStyle", "italic")
    editor.canvas.add(object);
    editor.canvas.renderAll();
  };

  const onUploadImage = (e) => {
    const image = e.target.files[0];
    fabric.Image.fromURL(URL.createObjectURL(image), (img) => {
      img.scale(0.2)
      editor.canvas.add(img);
      editor.canvas.renderAll();
    });
  };

  const downloadImage = () => {
    const ext = "png";
    const base64 = editor.canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true
    });
    const link = document.createElement("a");
    link.href = base64;
    console.log(link.href)
    link.download = `eraser_example.${ext}`;
    link.click();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };


  useEffect(() => {
    dispatch(ATemplateDetails(id))
    _onReady()
  }, [id, dispatch])

  return (
    <div id="data">
      {/* <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/> */}
      <div>
        <button onClick={addText} >
          Add Text
        </button>
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => onUploadImage(e)}
          multiple
          id="image"
        // style={{ display: "none" }}
        />
      </div>
      {/* <div>
        <button onClick={AddImage} >
                    Add Image
       </button>
       </div> */}
      <div>
        <div
          onClick={() => downloadImage()}
        >
          download
        </div>
        <div
          onClick={() => addBold(3)}
          className="item"
          color="#2d1be4"
        >ok</div>
        <div>
          <input
            value={color}
            // className="color"
            onChange={(e) => changeColor(e)}
            type="color"
          />
        </div>
        <button onClick={removeSelectedObject} >
          remove
        </button>
        <div>
          <ul>
            <li onClick={() => addBold()}>bold</li>
            <li onClick={() => additalic()}>italic</li>
          </ul>
          <select
            className="formSelect"
            style={{ borderRadius: "15px", width: "150px" }}
            aria-label="Disabled select example"
            disabled=""
            value={font}
            onChange={(e) => changeFont(e)}
            
          >
            <option value="Roboto">Roboto</option>
            <option value="bold">Bold</option>
            <option value="Tahoma (sans-serif)">Tahoma (sans-serif)</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
          </select>
        </div>
      </div>
      <FabricJSCanvas className="sample-canvas" onReady={_onReady} />
    </div>
  )
}

export default EditScreen;

          // <optgroup>
          //   <option selected="">Arial Black (sans-serif)</option>
          //   {/* <option onClick={() => addBold()}>bold</option>
          //   <option onClick={() => addBold()}>bold</option>
          //   <button onClick={() => addBold()}>bold</button>
          //   <option>italic</option> */}
          //   <option>italic</option>
          //   <option style={{ fontStyle: 'italic' }}>Comic Sans MS</option>
          //   </optgroup>
