import { useState } from "react";
import { useCMS } from "../../store/CMSContext";
import SectionEditor from "../../components/builder/SectionEditor";
import Preview from "../../components/builder/Preview";


export default function Builder(){

const {
pages,
addSection,
updateSection,
deleteSection
}=useCMS();


const [selectedPage,setSelectedPage]
=
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


<button
onClick={()=>
createSection("hero")
}
>
+ Add Hero
</button>


<button
onClick={()=>
createSection("text")
}
>
+ Add Text
</button>


<button
onClick={()=>
createSection("image")
}
>
+ Add Image
</button>


<button
onClick={()=>
createSection("gallery")
}
>
+ Add Gallery
</button>


<button
onClick={()=>
createSection("contact")
}
>
+ Add Contact
</button>


<button
onClick={()=>
createSection("button")
}
>
+ Add Button
</button>


</div>



{
page?.sections.map(
section=>(

<div
key={section.id}

style={{
border:"1px solid #444",
padding:"15px",
marginTop:"15px",
borderRadius:"8px"
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

onSave={(updatedSection)=>{

updateSection(

page.id,

section.id,

updatedSection

);

}}

/>



<button

style={{
marginTop:"10px"
}}

onClick={()=>
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

)

}



</div>



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