(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(2),o=n.n(c),l=(n(14),n(3)),r=n(4),s=n(6),d=n(5),u=n(7),m=(n(15),function(e){return i.a.createElement("p",{className:"circle-inner-text"},e.text)}),f=function(e){return i.a.createElement("div",{className:"inner-circle-border"},i.a.createElement("div",{className:"inner-circle"},e.children))},p=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(d.a)(t).call(this))).isHandleClick=function(t){t.preventDefault(),console.log("clicked"),e.setState({edit:!e.state.edit})},e.isHandleChange=function(e){e.preventDefault(),console.log(e.target.value)},e.isDispatchStatus=function(e){console.log(e)},e.state={name:"",edit:!1,slide:""},e.editStatus={true:{slide:"edit-start",fadeTitle:"fade-out",fadeInput:"fade-in",innerText:"Photo"},false:{slide:"edit-end",fadeTitle:"fade-in",fadeInput:"fade-out",innerText:"Edit"}},e}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.editStatus[this.state.edit],t=e.slide,n=e.fadeTitle,a=e.fadeInput,c=e.innerText;return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"edit-component"},i.a.createElement("p",{className:"title-cont ".concat(t," ").concat(n)},"Edit Your Profile"),i.a.createElement("div",{className:"image-cont ".concat(t),onClick:this.isHandleClick},i.a.createElement(f,null),i.a.createElement(m,{text:c})),i.a.createElement("div",{className:"input-cont ".concat(t," ").concat(a)},i.a.createElement("p",null,"name"),i.a.createElement("input",{type:"text",placeholder:"Write Your Name",onChange:this.isHandleChange,value:this.state.name}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.c9e39207.chunk.js.map