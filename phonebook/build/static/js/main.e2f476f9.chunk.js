(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(15),o=t.n(r),c=t(6),a=t(3),i=t(2),u=t(0),s=function(e){var n=e.person,t=e.removePerson;return Object(u.jsxs)("li",{children:[n.name," ",n.number," ",Object(u.jsx)("button",{onClick:t,children:"delete"})]},"".concat(n.id))},d=function(e){var n=e.newSearch,t=e.handleSearch;return Object(u.jsxs)("div",{children:["search: ",Object(u.jsx)("input",{value:n,onChange:t})]})},l=function(e){var n=e.addPerson,t=e.newName,r=e.handleNameChange,o=e.newNumber,c=e.handleNumberChange;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:t,onChange:r})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:o,onChange:c})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.message;return null===n?null:n.includes("removed")?Object(u.jsx)("div",{style:{color:"red",background:"lightGrey",fontSize:"20",borderStyle:"solid",borderRadius:"5",padding:"10",marginBottom:"20"},className:"message",children:n}):Object(u.jsx)("div",{style:{color:"green",background:"lightGrey",fontSize:"20",borderStyle:"solid",borderRadius:"5",padding:"10",marginBottom:"20"},className:"message",children:n})},m=t(4),h=t.n(m),j="/api/persons",f=function(){return h.a.get(j).then((function(e){return e.data}))},O=function(e){return h.a.post(j,e).then((function(e){return e.data}))},p=function(e){return h.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},g=function(e,n){return h.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},v=function(){var e=Object(i.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],o=Object(i.useState)(""),m=Object(a.a)(o,2),h=m[0],j=m[1],v=Object(i.useState)(""),x=Object(a.a)(v,2),w=x[0],C=x[1],S=Object(i.useState)(""),y=Object(a.a)(S,2),N=y[0],k=y[1],P=Object(i.useState)(null),B=Object(a.a)(P,2),L=B[0],T=B[1];Object(i.useEffect)((function(){f().then((function(e){r(e)}))}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Phonebook"}),Object(u.jsx)(b,{message:L}),Object(u.jsx)(d,{newSearch:N,handleSearch:function(e){k(e.target.value);var n=t.map((function(e){return{name:e.name.toLowerCase(),number:e.number,id:e.id}}));if(""!==e){var o;k(e.target.value.toLowerCase()),o=n.filter((function(e){return e.name.includes(N)?(e.name=e.name.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" "),{name:e.name,number:e.number,id:e.id}):""})),r(o)}else r(t)}}),Object(u.jsx)("h2",{children:"Add New Contact"}),Object(u.jsx)(l,{addPerson:function(e){e.preventDefault();var n={name:h,number:w},o=t.some((function(e){return e.number===w})),a=t.some((function(e){return e.name===h}));if(a)if(a&&!o){if(window.confirm("This contact is already added to phonebook, replace old number with new one?")){var i=t.find((function(e){return e.name===h})),u=Object(c.a)(Object(c.a)({},i),{},{number:w});g(i.id,u).then((function(e){r(t.map((function(n){return n.name!==h?n:e})))})).catch((function(e){console.log(e),T("".concat(i.name,"'s contact information has already been removed")),setTimeout((function(){T(null)}),5e3)}))}}else a&&window.alert("".concat(h," is already in the phonebook"));else O(n).then((function(e){r(t.concat(e)),T("".concat(n.name," was added to phonebook")),setTimeout((function(){T(null)}),5e3),j(""),C("")})).catch((function(e){console.log(e.response.data),T("Contact information is not sufficient, please try again")}))},newName:h,handleNameChange:function(e){j(e.target.value)},newNumber:w,handleNumberChange:function(e){C(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)("div",{children:Object(u.jsx)("ul",{children:t.map((function(e){return Object(u.jsx)(s,{person:e,removePerson:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&(p(e).then((function(e){return console.log(e)})).catch((function(e){console.log("error:",e)})),f().then((function(e){return r(e)})))}(e.id)}},e.id)}))})})]})};t(39);o.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.e2f476f9.chunk.js.map