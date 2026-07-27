import {
  createContext,
  useContext,
  useState
} from "react";


export type Section = {

  id:number;

  title:string;

  type:
    | "hero"
    | "text"
    | "image"
    | "gallery"
    | "contact"
    | "button";


  settings?:{

    heading?:string;

    text?:string;

    image?:string;

    buttonText?:string;

    buttonLink?:string;

  };

};



export type Page = {

  id:number;

  title:string;

  content:string;

  status:
    | "Published"
    | "Draft";

  sections:Section[];

};




type CMSContextType = {


  pages:Page[];


  addPage(
    title:string
  ):void;



  deletePage(
    id:number
  ):void;



  updatePage(
    id:number,
    data:Partial<Page>
  ):void;



  addSection(
    pageId:number,
    type:Section["type"]
  ):void;



  updateSection(
    pageId:number,
    sectionId:number,
    data:Partial<Section>
  ):void;



  deleteSection(
    pageId:number,
    sectionId:number
  ):void;


};






const defaultPages:Page[] = [

{

id:1,

title:"Home",

content:"Welcome to the homepage.",

status:"Published",

sections:[

{

id:1,

title:"Hero Section",

type:"hero",

settings:{

heading:"Welcome",

text:"Build amazing websites."

}

}

]

},



{

id:2,

title:"About",

content:"About this website.",

status:"Draft",

sections:[

{

id:2,

title:"Text Section",

type:"text",

settings:{

heading:"About Us",

text:"Tell your story here."

}

}

]

},



{

id:3,

title:"Contact",

content:"Contact information.",

status:"Published",

sections:[]

}

];






const CMSContext =
createContext<CMSContextType|null>(null);







export function CMSProvider({

children

}:{

children:React.ReactNode

}){



const [pages,setPages]=
useState<Page[]>(()=>{


const saved =
localStorage.getItem(
"blackframe-pages"
);



if(saved){

return JSON.parse(saved).map(
(page:Page)=>({

...page,

sections:
page.sections || []

})

);


}



return defaultPages;


});







function savePages(
updated:Page[]
){

setPages(updated);


localStorage.setItem(
"blackframe-pages",
JSON.stringify(updated)
);

}









function addPage(
title:string
){


const page:Page={

id:Date.now(),

title,

content:"",

status:"Draft",

sections:[]

};


savePages([

...pages,

page

]);


}








function deletePage(
id:number
){


savePages(

pages.filter(
p=>p.id!==id
)

);


}








function updatePage(
id:number,
data:Partial<Page>
){


savePages(

pages.map(

page=>

page.id===id

?

{

...page,

...data

}

:

page

)

);


}









function addSection(
pageId:number,
type:Section["type"]
){



savePages(

pages.map(

page=>{


if(page.id!==pageId)

return page;




const section:Section={

id:Date.now(),

title:

type.charAt(0).toUpperCase()
+
type.slice(1)
+
" Section",


type,


settings:{}

};



return{

...page,

sections:[

...page.sections,

section

]

};


}

)

);


}









function updateSection(

pageId:number,

sectionId:number,

data:Partial<Section>

){


savePages(

pages.map(

page=>{


if(page.id!==pageId)

return page;



return{

...page,

sections:

page.sections.map(

section=>

section.id===sectionId

?

{

...section,

...data

}

:

section

)

};


}

)

);


}









function deleteSection(

pageId:number,

sectionId:number

){


savePages(

pages.map(

page=>{


if(page.id!==pageId)

return page;



return{

...page,

sections:

page.sections.filter(

section=>

section.id!==sectionId

)

};


}

)

);


}








return(

<CMSContext.Provider

value={{

pages,

addPage,

deletePage,

updatePage,

addSection,

updateSection,

deleteSection

}}

>


{children}


</CMSContext.Provider>

);


}








export function useCMS(){


const context =
useContext(CMSContext);



if(!context){

throw new Error(
"useCMS must be used inside CMSProvider"
);

}



return context;


}