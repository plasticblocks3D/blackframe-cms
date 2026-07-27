import { useParams, useNavigate } from "react-router-dom";
import { useCMS } from "../../store/CMSContext";
import { useState } from "react";


export default function PageEditor() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    pages,
    updatePage
  } = useCMS();


  const page = pages.find(
    p => p.id === Number(id)
  );


  const [title,setTitle] = useState(
    page?.title || ""
  );


  const [content,setContent] = useState(
    page?.content || ""
  );



  if(!page){

    return (

      <div className="page">

        <h1>
          Page Not Found
        </h1>

        <button
          onClick={() => navigate("/pages")}
        >
          Back
        </button>

      </div>

    );

  }



  function savePage(){

    updatePage(
      page.id,
      {
        title,
        content
      }
    );


    navigate("/pages");

  }



  return (

    <div className="page">

      <h1>
        Edit Page
      </h1>



      <h3>
        Title
      </h3>

      <input

        value={title}

        onChange={
          e => setTitle(e.target.value)
        }

      />



      <br/><br/>



      <h3>
        Content
      </h3>


      <textarea

        rows={12}

        value={content}

        onChange={
          e => setContent(e.target.value)
        }

      />



      <br/><br/>



      <button
        onClick={savePage}
      >
        Save Changes
      </button>


    </div>

  );

}