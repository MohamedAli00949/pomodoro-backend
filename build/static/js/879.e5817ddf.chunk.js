"use strict";(self.webpackChunkpomodoro_=self.webpackChunkpomodoro_||[]).push([[879],{2879:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var s=n(885),i=n(4925),r=n(2791),a=n(9434),c=n(184),o=function(){return(0,c.jsxs)("svg",{version:"1.1",stroke:"currentColor",fill:"currentColor",strokeWidth:"0",height:"1em",width:"1em",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("g",{id:"SVGRepo_bgCarrier",strokeWidth:"0"}),(0,c.jsx)("g",{id:"SVGRepo_tracerCarrier",strokeLinecap:"round",strokeLinejoin:"round"}),(0,c.jsx)("g",{id:"SVGRepo_iconCarrier",children:["M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z","M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z","M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"].map((function(e,t){return(0,c.jsx)("path",{d:e,stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},t)}))})]})},l=n(3853),d=n(6856),u=n(828),h=n(5230),x=n(6409),k=["isLoading","setIsLoading","setMessage"],j=(0,r.lazy)((function(){return n.e(325).then(n.bind(n,6325))})),g=function(e){var t=e.isLoading,n=e.setIsLoading,g=e.setMessage,m=(0,i.Z)(e,k),f=(0,a.I0)(),p=(0,a.v9)((function(e){return e.tasks})).activeId,C=(0,a.v9)((function(e){return e.timer})).setting,b=(0,r.useState)(!1),v=(0,s.Z)(b,2),w=v[0],_=v[1],N=(0,r.useState)(!1),y=(0,s.Z)(N,2),L=y[0],S=y[1];(0,r.useEffect)((function(){if(m.notes&&document.querySelector(".task#task-".concat(m._id," .task-notes"))){document.querySelector(".task#task-".concat(m._id," .task-notes")).innerHTML="<p>"+m.notes.replaceAll(/([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm,(function(e){return'<a target="_blank" href="'.concat(e,'">').concat(e,"</a>")}))+"</p>"}}),[m]);return w?(0,c.jsx)(r.Suspense,{fallback:(0,c.jsx)(x.Z,{size:"40",strokeWidth:"3",color:"rgb(197 197 197)"}),children:(0,c.jsx)(j,{oldData:m,setOpen:_,isLoading:t,setIsLoading:n})}):(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"task ".concat(p===m._id?"active":""),id:"task-".concat(m._id),style:{"--progress":"".concat(m.act/m.est*100,"%")},onClick:function(){(!m.check&&C.autoStartNextTask||!C.autoStartNextTask&&m.act!==m.est)&&(p===m._id?f({type:h._U,data:{}}):p!==m._id&&f({type:h._U,data:m}))},children:[t===m._id&&(0,c.jsx)("div",{className:"loading-container",children:(0,c.jsx)(x.Z,{size:"40",strokeWidth:"3",color:"rgb(197 197 197)"})}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"},children:[(0,c.jsxs)("div",{className:"task-inner",children:[(0,c.jsx)("div",{className:"icon-container",children:m.check?(0,c.jsx)(u.iLT,{className:"task-uncheck"}):(0,c.jsx)(u.kEs,{className:"task-check"})}),(0,c.jsx)("p",{style:{textDecoration:m.check&&"line-through"},children:m.name})]}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row",marginRight:"10px"},children:[(0,c.jsxs)("p",{className:"act-est",children:[(0,c.jsx)("span",{children:m.act}),(0,c.jsx)("span",{style:{fontWeight:"normal",fontSize:"18px",marginInline:"4px"},children:"/"}),(0,c.jsx)("span",{children:m.est})]}),(0,c.jsxs)("div",{className:"menu",children:[(0,c.jsx)("button",{"aria-label":"toggle the task list menu",className:"toggle-menu",onClick:function(){return S((function(e){return!e}))},children:(0,c.jsx)(o,{})}),L&&(0,c.jsx)("div",{className:"menu-content",style:{right:20},children:(0,c.jsxs)("div",{className:"row",children:[!C.autoStartNextTask&&(0,c.jsx)("button",{"aria-label":"check button",onClick:function(){f((0,h.QB)(m._id,n,g)),S(!1)},children:m.check?(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(u.kEs,{})}):(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(u.iLT,{})})}),(0,c.jsx)("button",{"aria-label":"edit button",onClick:function(){return _((function(e){return!e}))},children:(0,c.jsx)(l.Nte,{})}),(0,c.jsx)("button",{"aria-label":"delet button",onClick:function(){f((0,h._5)(m._id,n,g)),S(!1)},style:{color:"red"},className:"delete",children:(0,c.jsx)(d.ZkW,{})})]})})]})]})]}),""!==m.notes&&(0,c.jsx)("div",{className:"task-notes"})]})})}}}]);
//# sourceMappingURL=879.e5817ddf.chunk.js.map