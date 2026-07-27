import { useState } from "react";
import { useCMS } from "../../store/CMSContext";
import SectionEditor from "../../components/builder/SectionEditor";
import Preview from "../../components/builder/Preview";


export default function Builder(){

const {
pages,
addSection,
updateSection,
deleteSection,
moveSectionUp,
moveSectionDown,
duplicateSection
}=useCMS();



const [selectedPage,setSelectedPage] =
useState<number>(
pages[0]?.id || 0
);



const page =
pages.find(
p=>p.id===selectedPage
);





function createSection(
type:
"hero"
|"text"
|"image"
|"gallery"
|"contact"
|"button"
){

if(!page) return;


addSection(
page.id,
type
);

}






return(

<div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"30px",

padding:"20px"

}}

>


{/* BUILDER SIDE */}


<div>


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

pages.map(page=>(

<option

key={page.id}

value={page.id}

>

{page.title}

</option>

))

}

</select>





<h2>
Sections
</h2>





<div>

<button onClick={()=>createSection("hero")}>
+ Hero
</button>


<button onClick={()=>createSection("text")}>
+ Text
</button>


<button onClick={()=>createSection("image")}>
+ Image
</button>


<button onClick={()=>createSection("gallery")}>
+ Gallery
</button>


<button onClick={()=>createSection("contact")}>
+ Contact
</button>


<button onClick={()=>createSection("button")}>
+ Button
</button>

</div>








{

page?.sections.map(

(section,index)=>(


<div

key={section.id}

style={{

border:"1px solid #444",

borderRadius:"10px",

padding:"15px",

marginTop:"15px"

}}

>


<h3>

{section.title}

</h3>



<p>
Type: {section.type}
</p>




<SectionEditor

section={section}

onSave={(data)=>{


updateSection(

page.id,

section.id,

data

);


}}

/>





<div

style={{

display:"flex",

gap:"8px",

flexWrap:"wrap",

marginTop:"15px"

}}

>



<button

disabled={index===0}

onClick={()=>{

moveSectionUp(

page.id,

section.id

);

}}

>

⬆ Move Up

</button>





<button

disabled={index===page.sections.length-1}

onClick={()=>{

moveSectionDown(

page.id,

section.id

);

}}

>

⬇ Move Down

</button>





<button

onClick={()=>{

duplicateSection(

page.id,

section.id

);

}}

>

📋 Duplicate

</button>





<button

onClick={()=>{

deleteSection(

page.id,

section.id

);

}}

>

🗑 Delete

</button>



</div>




</div>


)

)

}



</div>








{/* PREVIEW SIDE */}


<div>


<h1>
Website Preview
</h1>



{

page &&

<Preview

page={page}

/>

}



</div>





</div>

);


}