import { useState } from "react";
import { useCMS } from "../../store/CMSContext";


export default function SectionEditor({

section,

onSave

}:{

section:any;

onSave:(data:any)=>void;

}){


const {media}=useCMS();


const [form,setForm]=useState({

title:
section.settings?.heading || "",

text:
section.settings?.text || "",

image:
section.settings?.image || "",

buttonText:
section.settings?.buttonText || "",

buttonLink:
section.settings?.buttonLink || ""

});




function update(
key:string,
value:string
){

setForm({

...form,

[key]:value

});

}





function save(){

onSave({

settings:{

heading:form.title,

text:form.text,

image:form.image,

buttonText:form.buttonText,

buttonLink:form.buttonLink

}

});

}






return(

<div>


{
section.type==="hero" &&

<>

<label>
Title
</label>

<br/>

<input

value={form.title}

onChange={(e)=>
update(
"title",
e.target.value
)
}

/>


<br/><br/>


<label>
Subtitle
</label>

<br/>

<textarea

value={form.text}

onChange={(e)=>
update(
"text",
e.target.value
)
}

/>


<br/><br/>


<label>
Background Image
</label>


<select

value={form.image}

onChange={(e)=>
update(
"image",
e.target.value
)
}

>


<option value="">
Choose image
</option>


{

media.map(item=>(

<option

key={item.id}

value={item.url}

>

{item.name}

</option>

))

}


</select>


</>


}





{
section.type==="image" &&

<>


<h4>
Choose Image From Media Library
</h4>


<div

style={{

display:"flex",

gap:"10px",

flexWrap:"wrap"

}}

>


{

media.map(item=>(


<img

key={item.id}

src={item.url}

alt={item.name}

style={{

width:"80px",

height:"60px",

objectFit:"cover",

cursor:"pointer",

border:

form.image===item.url

?

"3px solid blue"

:

"1px solid gray"

}}

onClick={()=>update(

"image",

item.url

)}


/>


))


}


</div>


<br/>


<label>
Image URL
</label>


<br/>


<input

value={form.image}

onChange={(e)=>
update(
"image",
e.target.value
)
}

/>


</>

}




<br/>


<button

onClick={save}

>

Save Section

</button>


</div>


);


}