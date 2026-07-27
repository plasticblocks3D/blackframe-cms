import {
  useState
} from "react";

import {
  useCMS
} from "../../store/CMSContext";



export default function Media(){


const {
  media,
  addMedia,
  deleteMedia
}=useCMS();



const [fileName,setFileName]=useState("");





function handleUpload(
e:React.ChangeEvent<HTMLInputElement>
){


const file =
e.target.files?.[0];


if(!file)
return;



const reader =
new FileReader();



reader.onload=()=>{


addMedia({

id:Date.now(),

name:file.name,

url:reader.result as string

});


setFileName("");

};



reader.readAsDataURL(file);


}






return (

<div
style={{
padding:"30px"
}}
>


<h1>
Media Library
</h1>



<p>
Upload and manage images for your website.
</p>




<div
style={{
marginTop:"20px",
marginBottom:"30px"
}}
>


<input

type="file"

accept="image/*"

onChange={handleUpload}

/>


</div>





<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fill,minmax(180px,1fr))",

gap:"20px"

}}

>



{
media.map(item=>(


<div

key={item.id}

style={{

border:"1px solid #444",

borderRadius:"10px",

padding:"15px",

background:"#222"

}}

>


<img

src={item.url}

alt={item.name}

style={{

width:"100%",

height:"140px",

objectFit:"cover",

borderRadius:"8px"

}}

/>



<p>

{item.name}

</p>



<button

onClick={()=>deleteMedia(item.id)}

style={{

background:"#6d7cff",

color:"white",

border:"none",

padding:"8px 14px",

borderRadius:"6px",

cursor:"pointer"

}}

>

Delete

</button>



</div>


))

}



</div>





</div>

);


}