import type { Page } from "../../store/CMSContext";


export default function Preview({
  page
}:{
  page: Page;
}) {


return (

<div
style={{
background:"#111",
color:"#fff",
padding:"25px",
borderRadius:"12px",
minHeight:"400px"
}}
>


{
page.sections.map(section => {


const settings = section.settings || {};



return (

<div
key={section.id}
style={{
marginBottom:"35px"
}}
>



{/* HERO */}

{
section.type === "hero" && (

<section
style={{
padding:"40px",
borderRadius:"15px",
background:
settings.image
?
`linear-gradient(#0008,#0008),url(${settings.image})`
:
"#222",

backgroundSize:"cover",
backgroundPosition:"center"
}}
>


<h1
style={{
fontSize:"42px",
marginBottom:"15px"
}}
>
{settings.heading || section.title}
</h1>


<p
style={{
fontSize:"20px"
}}
>
{settings.text || ""}
</p>



{
settings.buttonText &&

<button
style={{
marginTop:"20px",
padding:"12px 25px",
borderRadius:"8px",
border:"none",
cursor:"pointer"
}}
>
{settings.buttonText}
</button>

}


</section>

)

}




{/* TEXT */}

{
section.type === "text" && (

<section
style={{
padding:"25px",
background:"#1b1b1b",
borderRadius:"12px"
}}
>


<h2>
{settings.heading || section.title}
</h2>


<p>
{settings.text || ""}
</p>


</section>

)

}





{/* IMAGE */}

{
section.type === "image" && (

<section>

{
settings.image &&

<img

src={settings.image}

alt="Website"

style={{
width:"100%",
borderRadius:"12px"
}}

/>

}


</section>

)

}




{/* BUTTON */}

{
section.type === "button" && (

<button

style={{
padding:"14px 30px",
borderRadius:"10px",
border:"none",
fontSize:"18px",
cursor:"pointer"
}}

>

{
settings.buttonText || "Click Here"
}

</button>

)

}




{/* CONTACT */}

{
section.type === "contact" && (

<section
style={{
padding:"25px",
background:"#1b1b1b",
borderRadius:"12px"
}}
>


<h2>
Contact
</h2>


<p>
{settings.text || "Contact information"}
</p>


</section>

)

}





{/* GALLERY */}

{
section.type === "gallery" && (

<section>

<h2>
Gallery
</h2>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"15px"
}}
>

<p>
Gallery images will appear here
</p>

</div>


</section>

)

}



</div>


)


})

}



</div>

);

}