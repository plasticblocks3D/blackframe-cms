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


  content?:string;

  image?:string;


  settings?:{

    heading?:string;

    text?:string;

    image?:string;

    buttonText?:string;

    buttonLink?:string;

  };

};



export type MediaItem = {

  id:number;

  name:string;

  url:string;

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


  media:MediaItem[];




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



  moveSectionUp(
    pageId:number,
    sectionId:number
  ):void;



  moveSectionDown(
    pageId:number,
    sectionId:number
  ):void;



  duplicateSection(
    pageId:number,
    sectionId:number
  ):void;



  addMedia(
    item:MediaItem
  ):void;



  deleteMedia(
    id:number
  ):void;


};




const defaultPages:Page[]=[

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

heading:"",

text:"",

image:"",

buttonText:"",

buttonLink:""

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

heading:"",

text:"",

image:""

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
createContext<CMSContextType | null>(null);





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


return saved
?
JSON.parse(saved)
:
defaultPages;


});





const [media,setMedia]=
useState<MediaItem[]>(()=>{


const saved =
localStorage.getItem(
"blackframe-media"
);


return saved
?
JSON.parse(saved)
:
[];


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






function saveMedia(
updated:MediaItem[]
){

setMedia(updated);


localStorage.setItem(

"blackframe-media",

JSON.stringify(updated)

);

}







function addPage(
title:string
){

const newPage:Page={

id:Date.now(),

title,

content:"",

status:"Draft",

sections:[]

};


savePages([

...pages,

newPage

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

pages.map(page=>


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

pages.map(page=>{


if(page.id!==pageId)

return page;



return{

...page,


sections:[

...page.sections,


{

id:Date.now(),

title:

type.charAt(0).toUpperCase()
+
type.slice(1)
+
" Section",


type,


settings:{

heading:"",

text:"",

image:"",

buttonText:"",

buttonLink:""

}

}

]

};


})

);


}







function updateSection(

pageId:number,

sectionId:number,

data:Partial<Section>

){

savePages(

pages.map(page=>{


if(page.id!==pageId)

return page;



return{

...page,


sections:

page.sections.map(section=>


section.id===sectionId

?

{

...section,

...data,


settings:{

...section.settings,

...data.settings

}

}

:

section


)

};


})

);


}






function deleteSection(

pageId:number,

sectionId:number

){

savePages(

pages.map(page=>{


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


})

);


}






function moveSectionUp(

pageId:number,

sectionId:number

){

savePages(

pages.map(page=>{


if(page.id!==pageId)

return page;



const sections=[...page.sections];


const index =
sections.findIndex(

s=>s.id===sectionId

);



if(index<=0)

return page;



[
sections[index-1],
sections[index]

]=

[
sections[index],
sections[index-1]

];



return{

...page,

sections

};


})

);


}





function moveSectionDown(

pageId:number,

sectionId:number

){

savePages(

pages.map(page=>{


if(page.id!==pageId)

return page;



const sections=[...page.sections];


const index =
sections.findIndex(

s=>s.id===sectionId

);



if(
index===-1 ||
index===sections.length-1
)

return page;



[
sections[index],
sections[index+1]

]=

[
sections[index+1],
sections[index]

];



return{

...page,

sections

};


})

);


}

function duplicateSection(

pageId:number,

sectionId:number

){

savePages(

pages.map(page=>{


if(page.id!==pageId)

return page;



const section =
page.sections.find(

s=>s.id===sectionId

);



if(!section)

return page;



return{

...page,


sections:[

...page.sections,


{

...section,

id:Date.now(),

title:
section.title+" Copy",


settings:{

...section.settings

}

}

]

};


})

);


}







function addMedia(

item:MediaItem

){

saveMedia([

...media,

item

]);

}






function deleteMedia(

id:number

){

saveMedia(

media.filter(

item=>

item.id!==id

)

);

}







return(

<CMSContext.Provider

value={{

pages,

media,

addPage,

deletePage,

updatePage,

addSection,

updateSection,

deleteSection,

moveSectionUp,

moveSectionDown,

duplicateSection,

addMedia,

deleteMedia

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