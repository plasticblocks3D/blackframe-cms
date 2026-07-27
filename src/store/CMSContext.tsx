import {
  createContext,
  useContext,
  useState
} from "react";


export type Section = {
  id: number;

  title: string;

  type:
    | "hero"
    | "text"
    | "image"
    | "gallery"
    | "contact"
    | "button";

  content?: string;

  image?: string;
};


export type Page = {
  id: number;
  title: string;
  content: string;
  status: "Published" | "Draft";
  sections: Section[];
};



type CMSContextType = {

  pages: Page[];

  addPage: (
    title: string
  ) => void;

  deletePage: (
    id:number
  ) => void;

  updatePage: (
    id:number,
    data:Partial<Page>
  ) => void;


  addSection: (
    pageId:number,
    type:Section["type"]
  ) => void;


  deleteSection: (
    pageId:number,
    sectionId:number
  ) => void;

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
 type:"hero"
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
 type:"text"
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


const [pages,setPages] =
useState<Page[]>(()=>{

const saved =
localStorage.getItem(
"blackframe-pages"
);


return saved
? JSON.parse(saved).map((page:Page)=>({
    ...page,
    sections: page.sections || []
  }))
: defaultPages;


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
  id: Date.now(),

  title:
    type.charAt(0).toUpperCase() +
    type.slice(1) +
    " Section",

  type,

  content: ""

}

]

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
s=>s.id!==sectionId
)

};


})

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