"use strict";(self.webpackChunkadmin_frontend=self.webpackChunkadmin_frontend||[]).push([[141],{2141:function(e,n,t){t.r(n);var a=t(4165),r=t(5861),o=t(4942),u=t(1413),l=t(9439),s=t(4554),i=t(890),c=t(6314),p=t(7391),d=t(3786),m=t(6151),h=t(1243),f=t(2791),v=t(9634),x=t(7689),Z=t(184);n.default=function(){var e=(0,f.useState)({name:"",amount:"",amountType:"",plans:[]}),n=(0,l.Z)(e,2),t=n[0],g=n[1],b=(0,f.useState)([]),j=(0,l.Z)(b,2),w=j[0],C=j[1],k=(0,f.useContext)(v.R).snackbar,y=(0,x.s0)(),S=(0,x.UO)().id,z=function(e){g((0,u.Z)((0,u.Z)({},t),{},(0,o.Z)({},e.target.name,e.target.value)))},E=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(n){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,h.Z.patch("/coupon/".concat(S),t);case 4:r=e.sent,k(r.data.status,r.data.message),y("/admin/promotions"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),k("error",e.t0.message);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(n){return e.apply(this,arguments)}}(),T=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){var n,t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.Z.get("/coupon/".concat(S));case 3:n=e.sent,t=n.data,g({name:t.coupon.name,amount:t.coupon.amount,amountType:t.coupon.amountType,plans:t.coupon.plans}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),k("error",e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.Z.get("/plan/all");case 3:n=e.sent,C(n.data.plans),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),k("error",e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return(0,f.useEffect)((function(){T(),W()}),[]),(0,Z.jsxs)(s.Z,{padding:"0px 20px 20px 20px",children:[(0,Z.jsx)(i.Z,{variant:"h1",align:"center",fontWeight:"800",fontSize:"28px",mb:2,sx:{color:"#795da8",width:"100%"},children:"Edit Coupon"}),(0,Z.jsxs)(c.Z,{spacing:3,m:2,alignItems:"center",component:"form",onSubmit:E,children:[(0,Z.jsx)(p.Z,{required:!0,size:"small",fullWidth:!0,name:"name",variant:"outlined",label:"Coupon Name",onChange:z,placeholder:"Add coupon name",value:t.name}),(0,Z.jsx)(p.Z,{required:!0,size:"small",fullWidth:!0,variant:"outlined",type:"number",label:"Amount or %",name:"amount",onChange:z,placeholder:"Enter Amount or %",value:t.amount}),(0,Z.jsxs)(p.Z,{required:!0,size:"small",fullWidth:!0,select:!0,label:"Amount In",name:"amountType",value:null===t||void 0===t?void 0:t.amountType,onChange:z,children:[(0,Z.jsx)(d.Z,{value:"price",children:"Price"}),(0,Z.jsx)(d.Z,{value:"percentage",children:"Percentage"})]}),(0,Z.jsx)(p.Z,{required:!0,size:"small",fullWidth:!0,select:!0,name:"plans",SelectProps:{multiple:!0,value:t.plans,onChange:z},label:"Select Plan",children:null===w||void 0===w?void 0:w.map((function(e){return(0,Z.jsx)(d.Z,{value:e.name,children:e.name},e._id)}))}),(0,Z.jsxs)(c.Z,{direction:"row",justifyContent:"space-between",width:"100%",children:[(0,Z.jsx)(m.Z,{disableElevation:!0,variant:"contained",sx:{color:"white"},type:"submit",children:"Update Coupon"}),(0,Z.jsx)(m.Z,{onClick:function(){y("/admin/promotions")},disableElevation:!0,variant:"outlined",children:"Cancel"})]})]})]})}}}]);
//# sourceMappingURL=141.91be9611.chunk.js.map