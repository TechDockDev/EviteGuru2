"use strict";(self.webpackChunkadmin_frontend=self.webpackChunkadmin_frontend||[]).push([[695],{5695:function(e,n,t){t.r(n);var i=t(4165),r=t(5861),a=t(9439),o=t(1115),s=t(2791),d=t(890),u=t(6151),l=t(4554),c=t(1243),p=t(7689),v=t(9634),h=t(184);n.default=function(){var e=(0,s.useState)(!1),n=(0,a.Z)(e,2),t=n[0],f=(n[1],(0,s.useState)()),m=(0,a.Z)(f,2),w=m[0],x=m[1],g=(0,p.s0)(),b=(0,s.useContext)(v.R).snackbar,Z=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.Z.get("/user/all-users");case 3:n=e.sent,x(n.data.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(n){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.Z.patch("/user/suspend",{userId:n});case 3:t=e.sent,Z(),b(t.data.status,t.data.message),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),b("error",e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(n){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){Z()}),[]);var C=[{field:"name",headerName:"Name",width:150,renderCell:function(e){var n;return(0,h.jsx)(d.Z,{fontSize:"14px",sx:{"&:hover":{textDecoration:"underline",cursor:"pointer"}},children:null===e||void 0===e||null===(n=e.row)||void 0===n?void 0:n.name})}},{field:"email",headerName:"Email",width:210},{field:"phone",headerName:"Phone",width:150},{field:"templateNum",headerName:"Template"},{field:"guestNum",headerName:"Guests",width:100},{field:"subscription",headerName:"Subscription",width:150,renderCell:function(e){var n,t;return(0,h.jsx)("div",{children:null===e||void 0===e||null===(n=e.row)||void 0===n||null===(t=n.subscription)||void 0===t?void 0:t.name})}},{field:"status",headerName:"Status",width:150,renderCell:function(e){var n,t,i,r;return console.log("suspended",null===e||void 0===e||null===(n=e.row)||void 0===n?void 0:n.suspended),(0,h.jsxs)(u.Z,{size:"small",sx:{color:null!==e&&void 0!==e&&null!==(t=e.row)&&void 0!==t&&t.suspended?"#AE9CCA":"white"},disableElevation:!0,variant:null!==e&&void 0!==e&&null!==(i=e.row)&&void 0!==i&&i.suspended?"outlined":"contained",onClick:function(n){var t;n.stopPropagation(),k(null===e||void 0===e||null===(t=e.row)||void 0===t?void 0:t._id)},children:[(null===e||void 0===e||null===(r=e.row)||void 0===r?void 0:r.suspended)&&"un","suspend User"]})}}];return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(l.Z,{paddingX:"10px",boxSizing:"border-box",children:[(0,h.jsx)(d.Z,{variant:"h1",align:"center",fontWeight:"800",fontSize:"28px",mb:2,sx:{color:"#795da8",width:"100%"},children:"List of users"}),w&&(0,h.jsx)(o._,{width:"98%",rows:w,getRowId:function(e){return e._id},columns:C,disableRowSelectionOnClick:!0,autoHeight:!0,initialState:{pagination:{paginationModel:{pageSize:10}}},loading:t,onRowClick:function(e,n){n.stopPropagation(),g("/admin/user/".concat(e.id))},pageSizeOptions:[5],sx:{border:"2px solid #795DA8","&.MuiDataGrid-root .MuiDataGrid-cell:focus-within":{outline:"none !important"},"& .MuiDataGrid-columnHeaderTitle":{fontWeight:"600"},"& .MuiDataGrid-row":{cursor:"pointer"}}})]})})}}}]);
//# sourceMappingURL=695.3d9ed8c0.chunk.js.map