import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Admineditor = ({ onTextChange, defaultText }) => {
  return (
    <div className="admin-editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={defaultText}
        onChange={(event, editor) => {
          const data = editor.getData();
          onTextChange(data);
        }}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "imageUpload",
            "insertTable",
            "tableColumn",
            "tableRow",
            "|",
            "undo",
            "redo",
          ],
        }}
      />
    </div>
  );
};

export default Admineditor;
