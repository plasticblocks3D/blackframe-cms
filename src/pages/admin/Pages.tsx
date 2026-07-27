import { useCMS } from "../../store/CMSContext";


export default function Pages() {

  const {
    pages,
    deletePage
  } = useCMS();


  return (

    <div className="page">

      <h1>Pages</h1>


      <button className="primary-button">
        + New Page
      </button>



      <div className="page-table">


        {pages.map(page => (

          <div
            className="page-row"
            key={page.id}
          >

            <strong>
              {page.title}
            </strong>


            <span>
              {page.status}
            </span>


            <div>

              <button>
                Edit
              </button>


              <button
                onClick={() =>
                  deletePage(page.id)
                }
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