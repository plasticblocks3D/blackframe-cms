import { useState } from "react";
import { useCMS } from "../../store/CMSContext";


export default function Builder() {


  const {
    pages,
    addSection,
    deleteSection
  } = useCMS();



  const [selectedPage, setSelectedPage] = useState<number>(
    pages.length > 0 ? pages[0].id : 0
  );



  const page = pages.find(
    p => p.id === selectedPage
  );



  function createSection(
    type:
      | "hero"
      | "text"
      | "image"
      | "gallery"
      | "contact"
      | "button"
  ) {

    if (!page) {
      return;
    }


    addSection(
      page.id,
      type
    );

  }



  if (!page) {

    return (

      <div className="page">

        <h1>
          Page Builder
        </h1>

        <p>
          No pages exist yet.
        </p>

      </div>

    );

  }




  return (

    <div className="page">


      <h1>
        Page Builder
      </h1>



      <select
        value={selectedPage}
        onChange={(e)=>
          setSelectedPage(
            Number(e.target.value)
          )
        }
      >

        {
          pages.map(
            p =>

            <option
              key={p.id}
              value={p.id}
            >
              {p.title}
            </option>

          )
        }

      </select>




      <div>


        <button
          onClick={() =>
            createSection("hero")
          }
        >
          + Add Hero
        </button>



        <button
          onClick={() =>
            createSection("text")
          }
        >
          + Add Text
        </button>



        <button
          onClick={() =>
            createSection("image")
          }
        >
          + Add Image
        </button>



        <button
          onClick={() =>
            createSection("gallery")
          }
        >
          + Add Gallery
        </button>



        <button
          onClick={() =>
            createSection("contact")
          }
        >
          + Add Contact
        </button>



        <button
          onClick={() =>
            createSection("button")
          }
        >
          + Add Button
        </button>


      </div>





      <h2>
        Sections
      </h2>



      {
  (page.sections || []).map(

    section =>

          <div
            key={section.id}
            className="card"
          >

            <h3>
              {section.title}
            </h3>


            <p>
              Type: {section.type}
            </p>


            <button
              onClick={() =>
                deleteSection(
                  page.id,
                  section.id
                )
              }
            >
              Delete
            </button>


          </div>

        )
      }



    </div>

  );

}