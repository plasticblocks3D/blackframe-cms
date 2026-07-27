import { useCMS } from "../../store/CMSContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Pages() {


  const { pages, addPage, deletePage } = useCMS();


  const navigate = useNavigate();


  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");



  function createPage() {

    if (!name.trim()) return;


    addPage(name);


    setName("");

    setCreating(false);

  }



  return (

    <div className="page">


      <h1>Pages</h1>



      {!creating && (

        <button

          onClick={() => setCreating(true)}

        >

          + New Page

        </button>

      )}




      {creating && (

        <div className="stat-card">


          <input

            placeholder="Page name"

            value={name}

            onChange={
              e => setName(e.target.value)
            }

          />


          <button onClick={createPage}>

            Create

          </button>


          <button

            onClick={() => setCreating(false)}

          >

            Cancel

          </button>


        </div>

      )}






      <div className="stat-card">


      {pages.map(page => (

        <div

          key={page.id}

          style={{
            display:"flex",
            justifyContent:"space-between",
            padding:"20px",
            borderBottom:"1px solid #444"
          }}

        >


          <strong>
            {page.title}
          </strong>


          <span>
            {page.status}
          </span>



          <div>


          <button

            onClick={() =>
              navigate(`/pages/edit/${page.id}`)
            }

          >

            Edit

          </button>



          <button

            onClick={() =>
              deletePage(page.id)
            }

            style={{
              marginLeft:"10px"
            }}

          >

            Delete

          </button>


          </div>


        </div>


      ))}


      </div>


    </div>

  );

}