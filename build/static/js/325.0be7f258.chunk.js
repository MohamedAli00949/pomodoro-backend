"use strict";(self.webpackChunkpomodoro_=self.webpackChunkpomodoro_||[]).push([[325],{6325:function(e,t,n){n.r(t);var a=n(4942),s=n(1413),o=n(885),r=n(2791),i=n(9434),c=n(5230),l=n(7376),d=n(6409),u=n(184),m={name:"",est:1,notes:"",project:""};t.default=function(e){var t=e.oldData,n=e.setOpen,x=e.isLoading,h=e.setIsLoading,p=(0,i.I0)(),f=(0,r.useState)(null===t?m:t),j=(0,o.Z)(f,2),g=j[0],b=j[1],v=(0,r.useState)(""!==g.notes),y=(0,o.Z)(v,2),N=y[0],k=y[1],Z=(0,r.useState)(""!==g.project),C=(0,o.Z)(Z,2),S=C[0],z=C[1],w=(0,r.useState)({type:"",message:""}),F=(0,o.Z)(w,2),I=F[0],L=F[1],W=(0,i.v9)((function(e){return e.timer})),_=W.activites,q=W.active,D=function(e){"est"===e.target.name||"act"===e.target.name?b((0,s.Z)((0,s.Z)({},g),{},(0,a.Z)({},e.target.name,Number(e.target.value)))):b((0,s.Z)((0,s.Z)({},g),{},(0,a.Z)({},e.target.name,e.target.value)))};return(0,u.jsxs)(u.Fragment,{children:[I.message&&(0,u.jsx)(l.Z,{message:I.message,type:I.type,setMessage:L}),x===(null===g||void 0===g?void 0:g._id)&&(0,u.jsx)("div",{className:"loading-container",style:{position:"fixed",top:"0",right:"0",background:"#ffffff73",width:"100%",height:"100%",zIndex:"1000",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,u.jsx)(d.Z,{size:"100",strokeWidth:"5",color:_[q].color,backgroud:"transperent"})}),(0,u.jsxs)("form",{className:"task-form","data-aos":"zoom-in",style:{margin:null!==t&&"20px 0 20px"},onSubmit:function(e){e.preventDefault(),n((function(e){return!e})),g.name&&g.est||L("Error at name or est"),p(t?(0,c.HZ)(g,g._id,h,L):(0,c.Pb)(g,h,L))},children:[(0,u.jsx)("div",{className:"form-container",children:(0,u.jsxs)("div",{className:"form-inner-container",children:[(0,u.jsxs)("div",{className:"block",style:{position:"relative"},children:[(0,u.jsx)("input",{autoFocus:!0,className:"".concat(!g.name&&"error"," name"),maxLength:"50",required:!0,name:"name",type:"text",value:g.name,placeholder:"What are you working on?",onChange:D}),(0,u.jsx)("div",{className:"text-counter",style:{color:"".concat(50-g.name.length>10?"#4caf50":"#ff002f")},children:(0,u.jsx)("p",{style:{fontSize:"16px",fontWeight:"500",marginBottom:"15px"},children:50-g.name.length})})]}),(0,u.jsxs)("div",{className:"block",children:[(0,u.jsxs)("p",{children:[g.act>=0&&(0,u.jsx)(u.Fragment,{children:"act / "}),"est pomodoros"]}),(0,u.jsxs)("div",{className:"pomodoros",children:[g.act>=0&&(0,u.jsx)("div",{className:"input-number",children:(0,u.jsx)("input",{name:"act",className:"act",type:"number",min:"0",max:"1000",defaultValue:g.act,onChange:D})}),g.act>=0&&(0,u.jsx)(u.Fragment,{children:"/"}),(0,u.jsx)("div",{className:"input-number",children:(0,u.jsx)("input",{name:"est",required:!0,className:"".concat(!g.est&&"error"),type:"number",min:"1",max:"1000",defaultValue:g.est,onChange:D})})]})]}),(0,u.jsxs)("div",{className:"block",children:[N&&(0,u.jsxs)("div",{className:"notes",children:[(0,u.jsx)("textarea",{name:"notes",type:"text",maxLength:"500",onChange:D,value:g.notes}),(0,u.jsx)("div",{className:"text-counter",style:{color:"".concat(500-g.notes.length>100?"#4caf50":"#ff002f")},children:(0,u.jsx)("p",{style:{fontSize:"16px",fontWeight:"500"},children:500-g.notes.length})})]}),S&&(0,u.jsx)("div",{className:"project",children:(0,u.jsx)("input",{name:"project",type:"text",onChange:D,value:g.project})}),(0,u.jsxs)("div",{className:"add-buttons",children:[!N&&(0,u.jsx)("button",{"aria-label":"add notes button",type:"button",onClick:function(){return k((function(e){return!e}))},children:"+ add notes"}),!S&&(0,u.jsx)("button",{"aria-label":"add project button",type:"button",onClick:function(){return z((function(e){return!e}))},children:"+ add project"})]})]})]})}),(0,u.jsxs)("div",{className:"task-footer",children:[(0,u.jsx)("button",{"aria-label":"cancel form button",type:"button",onClick:function(){return n((function(e){return!e}))},children:"cancel"}),(0,u.jsx)("div",{children:(0,u.jsx)("button",{"aria-label":"submit form button",type:"submit",className:"save",disabled:!g.name||!g.est,children:"save"})})]})]})]})}}}]);
//# sourceMappingURL=325.0be7f258.chunk.js.map