import { useParams, useNavigate } from "react-router-dom";
import { useCMS } from "../../store/CMSContext";
import { useState } from "react";


export default function PageEditor() {


  const { id } = useParams();

  const navigate = useNavigate();

  const { pages } = useCMS();


  const page = pages.find(
    p => p.id === Number(id)
  );


  const [title, setTitle] = useState(
    page?.title || ""
  );


  if (!page) {

    return (

      <div className="page">

        <h1>Page Not Found</h1>

        <button onClick={() => navigate("/pages")}>

          Back

        </button>

      </div>

    );

  }



  return (

    <div className="page">

      <h1>Edit Page</h1>


      <div className="stat-card">


        <label>
          Page Title
        </label>


        <input

          value={title}

          onChange={
            e => setTitle(e.target.value)
          }

          style={{
            width:"100%",
            padding:"12px",
            marginTop:"10px"
          }}

        />


        <br /><br />


        <button>

          Save Changes

        </button>


        <button

          onClick={() => navigate("/pages")}

          style={{
            marginLeft:"10px"
          }}

        >

          Cancel

        </button>


      </div>


    </div>

  );

}