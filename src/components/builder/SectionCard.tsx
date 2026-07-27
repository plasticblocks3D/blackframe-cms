type Props = {
  type: string;
  title: string;
};


export default function SectionCard({
  type,
  title
}: Props){

  return (

    <div className="section-card">

      <h3>
        {title}
      </h3>


      <p>
        Type: {type}
      </p>


    </div>

  );

}