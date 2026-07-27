import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useCMS
} from "../../store/CMSContext";

import {
  useState
} from "react";


export default function PageEditor(){


  const {
    pages,
    updatePage
  } = useCMS();


  const {
    id
  } = useParams();


  const navigate = useNavigate();


  const page = pages.find(
    p => p.id === Number(id)
  );


  const [title, setTitle] =
    useState("");


  const [content, setContent] =
    useState("");



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



  function save(){

    updatePage(
  page!.id,

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



      <label>
        Title
      </label>


      <br/>


      <input

        value={
          title || page.title
        }

        onChange={
          e => setTitle(e.target.value)
        }

      />



      <br/>
      <br/>



      <label>
        Content
      </label>


      <br/>



      <textarea

        value={
          content || page.content
        }

        onChange={
          e => setContent(e.target.value)
        }

      />



      <br/>
      <br/>



      <button
        onClick={save}
      >
        Save Changes
      </button>



    </div>

  );


}