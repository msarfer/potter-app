import{u as x,r as t,A as o,a as u,b as h,j as s,C as f,c as p,d as j,e as m,f as C,M as r,B as v,H as N}from"./index-DoukH7Fw.js";const w=({book:e})=>{const{favs:a}=x(l=>l.books),{user:c}=t.useContext(o),n=u(),i=t.useCallback(()=>{const l=a.includes(e.index)?a.filter(d=>d!==e.index):[...a,e.index];n(h({userId:c.uid,favs:l}))},[a]);return s.jsxs(f,{className:"p-0 m-0 flex flex-row overflow-hidden w-5/12",children:[s.jsx("img",{src:e.cover,alt:e.title,className:"h-full w-1/2 object-fit rounded-tl-lg"}),s.jsxs(p,{className:"w-1/2 p-4",children:[s.jsx(j,{children:s.jsx("h3",{className:"text-accent-foreground",children:e.title})}),s.jsxs(m,{className:"text-balance p-0 h-full",children:[s.jsx(C,{className:"text-justify h-2/4 overflow-auto",children:e.description}),s.jsxs("div",{className:"flex flex-col justify-evenly gap-4 h-1/3 mt-5",children:[s.jsxs("h5",{className:"flex flex-col",children:[s.jsx(r,{id:"books.pub"})," ",s.jsx("span",{children:e.releaseDate})]}),s.jsxs("h5",{className:" flex flex-col",children:[s.jsx(r,{id:"books.page"})," ",s.jsx("span",{children:e.pages})]}),s.jsx(v,{variant:"outline",className:"cursor-pointer w-full",onClick:i,children:s.jsx(N,{fill:`${a.includes(e.index)?"currentColor":"none"}`})})]})]})]})]})};export{w as Book};
