import { useState } from "react";
import type { Section } from "../../store/CMSContext";


type Props = {

section:Section;

onSave:(

data:Partial<Section>

)=>void;

};



export default function SectionEditor({

section,

onSave

}:Props){



const [settings,setSettings] =

useState(

section.settings || {}

);





function update(

key:string,

value:string

){

setSettings({

...settings,

[key]:value

});

}





function save(){

onSave({

settings

});

}







return(

<div>



{/* HERO EDITOR */}

{

section.type==="hero" && (

<>


<label>
Title
</label>

<input

value={settings.heading || ""}

onChange={e=>

update(
"heading",
e.target.value
)

}

/>



<br/><br/>




<label>
Subtitle
</label>


<textarea

value={settings.text || ""}

onChange={e=>

update(
"text",
e.target.value
)

}

/>



<br/><br/>




<label>
Background Image URL
</label>


<input

value={settings.image || ""}

onChange={e=>

update(
"image",
e.target.value
)

}

/>



<br/><br/>




<label>
Button Text
</label>


<input

value={settings.buttonText || ""}

onChange={e=>

update(
"buttonText",
e.target.value
)

}

/>


</>

)

}






{/* TEXT EDITOR */}

{

section.type==="text" && (

<>


<label>
Heading
</label>


<input

value={settings.heading || ""}

onChange={e=>

update(
"heading",
e.target.value
)

}

/>



<br/><br/>




<label>
Paragraph
</label>


<textarea

value={settings.text || ""}

onChange={e=>

update(
"text",
e.target.value
)

}

/>


</>

)

}






{/* IMAGE EDITOR */}

{

section.type==="image" && (

<>


<label>
Image URL
</label>


<input

value={settings.image || ""}

onChange={e=>

update(
"image",
e.target.value
)

}

/>


</>

)

}






{/* BUTTON EDITOR */}

{

section.type==="button" && (

<>


<label>
Button Text
</label>


<input

value={settings.buttonText || ""}

onChange={e=>

update(
"buttonText",
e.target.value
)

}

/>



<br/><br/>




<label>
Button Link
</label>


<input

value={settings.buttonLink || ""}

onChange={e=>

update(
"buttonLink",
e.target.value
)

}

/>


</>

)

}






{/* CONTACT EDITOR */}

{

section.type==="contact" && (

<>


<label>
Contact Information
</label>


<textarea

value={settings.text || ""}

onChange={e=>

update(
"text",
e.target.value
)

}

/>


</>

)

}







<button

style={{

marginTop:"15px"

}}

onClick={save}

>

Save Section

</button>



</div>

);

}