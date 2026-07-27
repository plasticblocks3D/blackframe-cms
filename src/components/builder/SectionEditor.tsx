import { useState } from "react";
import type { Section } from "../../store/CMSContext";


type Props = {

section: Section;

onSave:(
data:Partial<Section>
)=>void;

};



export default function SectionEditor({
section,
onSave
}:Props){


const [settings,setSettings]=
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



return(

<div className="card">

<h3>
Edit {section.title}
</h3>


<label>
Heading
</label>

<input

value={
settings.heading || ""
}

onChange={
e=>
update(
"heading",
e.target.value
)
}

/>



<br/><br/>



<label>
Text
</label>


<textarea

value={
settings.text || ""
}

onChange={
e=>
update(
"text",
e.target.value
)
}

/>



<br/><br/>



<label>
Image URL
</label>


<input

value={
settings.image || ""
}

onChange={
e=>
update(
"image",
e.target.value
)
}

/>



<br/><br/>



<button

onClick={()=>{

onSave({

settings

});

}}

>

Save Section

</button>


</div>

);


}