import SectionCard from "../../components/builder/SectionCard";


export default function Builder(){

  const sections = [

    {
      id:1,
      type:"hero",
      title:"Hero Section"
    },

    {
      id:2,
      type:"text",
      title:"Text Section"
    },

    {
      id:3,
      type:"image",
      title:"Image Section"
    }

  ];


  return (

    <div className="page">

      <h1>
        Page Builder
      </h1>


      <button>
        + Add Section
      </button>


      <div>

        {
          sections.map(section=>(

            <SectionCard

              key={section.id}

              type={section.type}

              title={section.title}

            />

          ))
        }

      </div>


    </div>

  );

}