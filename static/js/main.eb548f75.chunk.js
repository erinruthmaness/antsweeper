(this.webpackJsonpantsweeper=this.webpackJsonpantsweeper||[]).push([[0],[,,,function(e,n,a){e.exports={page_nav:"Nav_page_nav__vDmiy",menu_bar:"Nav_menu_bar__1GFe8",menu_bar__left:"Nav_menu_bar__left__2-N_-",game_title:"Nav_game_title__1jH2S",menu_bar__right:"Nav_menu_bar__right__1h9Yg",windows95_button:"Nav_windows95_button__1EptJ",wc_box:"Nav_wc_box__1UbMO",wc_minimize:"Nav_wc_minimize__3_MRO",wc_maximize:"Nav_wc_maximize__229wl",wc_close:"Nav_wc_close__2orTD",dropdown_menu:"Nav_dropdown_menu__FWZOg",dropdown_choice:"Nav_dropdown_choice__1O6zs"}},,function(e,n,a){e.exports={calc_screen:"CalcScreen_calc_screen__3tjOL",calc_screen__digit:"CalcScreen_calc_screen__digit__pVuWc",digit_half:"CalcScreen_digit_half__tHRsU",digit_0:"CalcScreen_digit_0__1B8dK",num_top:"CalcScreen_num_top__1L84O",num_bottom:"CalcScreen_num_bottom__1Ml-A",digit_4:"CalcScreen_digit_4__1Ng4d",digit_1:"CalcScreen_digit_1__3hmyY",digit_7:"CalcScreen_digit_7__fJeE-",digit_2:"CalcScreen_digit_2__11c0d",digit_5:"CalcScreen_digit_5__3bn83",digit_3:"CalcScreen_digit_3__2pnmt",digit_9:"CalcScreen_digit_9__EzkXc",digit_6:"CalcScreen_digit_6__1tb4a"}},,function(e,n,a){e.exports={board_controls:"Controls_board_controls__Ccfad",calc_screen__wrapper:"Controls_calc_screen__wrapper__2NflD"}},,function(e,n,a){e.exports={window__inner:"Board_window__inner__aoiFq",board__outer:"Board_board__outer__3tOml",board__inner:"Board_board__inner__3wIj1"}},,function(e,n,a){e.exports={grid_square:"Square_grid_square__1bEeJ",clicked_square:"Square_clicked_square__3OEAd"}},,function(e,n,a){e.exports={control_button:"FaceButton_control_button__1J2Mc"}},function(e,n,a){e.exports={board_row:"SquaresWrapper_board_row__2C4Un"}},function(e,n,a){e.exports={main_window:"Window_main_window___OveE"}},function(e,n,a){e.exports={windows_footer:"Footer_windows_footer__1_U7x"}},function(e,n,a){e.exports={App:"App_App__23Vul"}},,,,,,function(e,n,a){},,function(e,n,a){"use strict";a.r(n);var t=a(2),c=a.n(t),r=a(12),o=a.n(r),i=(a(23),a(3)),s=a.n(i),l=a(0),_=function(){return Object(l.jsxs)("header",{className:s.a.page_nav,children:[Object(l.jsxs)("section",{className:s.a.menu_bar,children:[Object(l.jsxs)("span",{className:s.a.menu_bar__left,children:[String.fromCharCode("0xD83D","0xDC1C"),Object(l.jsx)("span",{className:s.a.game_title,children:"Antsweeper"})]}),Object(l.jsxs)("span",{className:"".concat(s.a.menu_bar__right," ").concat(s.a.wc_box),disabled:!0,children:[Object(l.jsx)("button",{className:s.a.wc_minimize}),Object(l.jsx)("button",{className:s.a.wc_maximize}),Object(l.jsx)("button",{className:s.a.wc_close})]})]}),Object(l.jsxs)("section",{className:s.a.dropdown_menu,children:[Object(l.jsx)("button",{className:s.a.dropdown_choice,children:"Game"}),Object(l.jsx)("button",{className:s.a.dropdown_choice,children:"Help"})]})]})},u=a(18),d=a(4),f=a(13),g=a.n(f),b=function(e){return Object(l.jsx)("button",{className:"windows95 ".concat(g.a.control_button),onClick:e.onClick,children:String.fromCharCode(e.face[0],e.face[1])})},j=a(5),m=a.n(j),p=function(e){var n=e.display.toString().padStart(3,"0").split("");return n&&"off"!==n||(n=["8","8","8"]),Object(l.jsx)("section",{className:m.a.calc_screen,id:e.id,children:n.map((function(n,a){return Object(l.jsxs)("div",{className:"".concat(m.a.calc_screen__digit," ").concat(m.a[(t=n,"digit_"+t.toString())]),children:[Object(l.jsx)("div",{className:"".concat(m.a.num_top," ").concat(m.a.digit_half)}),Object(l.jsx)("div",{className:"".concat(m.a.num_bottom," ").concat(m.a.digit_half)})]},"".concat(e.id,"-digit-").concat(a));var t}))})},h=a(7),w=a.n(h),x=function(e){return Object(l.jsxs)("nav",{className:w.a.board_controls,children:[Object(l.jsx)("div",{className:w.a.calc_screen__wrapper,children:Object(l.jsx)(p,{id:"flags",display:e.inProgress?e.flags:"off"})}),Object(l.jsx)("div",{className:w.a.face_button__wrapper,children:Object(l.jsx)(b,{onClick:e.startGame,face:e.face})}),Object(l.jsx)("div",{className:w.a.calc_screen__wrapper,children:Object(l.jsx)(p,{id:"timer",display:"off"})})]})},O=a(1),v={unclicked:"?",clicked:"",ant:["0xD83D","0xDC1C"],flag:["0xD83D","0xDEA9"]},y={sleeping:["0xD83D","0xDE34"],smiling:["0xD83D","0xDE0A"],yelling:["0xD83D","0xDE31"],upsideDown:["0xD83D","0xDE43"],exploded:["0xD83E","0xDD2F"],shades:["0xD83D","0xDE0E"],xEyes:["0xD83D","0xDE35"],sweating:["0xD83D","0xDE13"],winking:["0xD83D","0xDE09"]},D={squareResponse:function(e,n){return{which:e,face:n}},touchStart:function(e){return e?D.squareResponse("touchStart",y.winking):D.squareResponse("touchStart",y.yelling)},touchEnd:function(e){return console.log("touch end count is "+e),e>0?D.squareResponse("right",y.smiling):D.squareResponse("left",y.smiling)},mouseDown:function(e,n){return 1===e?n.flagged?D.squareResponse("left",y.winking):D.squareResponse("left",y.yelling):n.flagged?D.squareResponse("right",y.sweating):D.squareResponse("right",y.smiling)}},q={routeClick:function(e,n,a){return"left"===n?q.leftClick(e,a):"right"===n?q.rightClick(e,a):void 0},leftClick:function(e,n){return e.flagged||e.revealed?{square:e,face:y.smiling,continue:!0}:e.ant?{square:Object(O.a)(Object(O.a)({},e),{},{display:v.ant,revealed:!0}),face:y.exploded,continue:!1,flags:n}:{square:Object(O.a)(Object(O.a)({},e),{},{display:0===e.nearbyAnts?"":e.nearbyAnts,revealed:!0}),face:y.smiling,continue:!0,flags:n}},rightClick:function(e,n){return e.flagged?{square:Object(O.a)(Object(O.a)({},e),{},{display:v.unclicked,revealed:!1,flagged:!1}),face:y.smiling,continue:!0,flags:n+1}:n>0?{square:Object(O.a)(Object(O.a)({},e),{},{display:v.flag,revealed:!1,flagged:!0}),face:y.smiling,continue:!0,flags:n-1}:{square:Object(O.a)({},e),face:y.smiling,continue:!0,flags:n}}},C=a(11),N=a.n(C),S=!1,k="left",E=!1,A=0;var F=function(e){var n=Object(t.useRef)(),a=function(){S=!1,k="left",E=!1,A=0},c=function(n,t){if(e.gameOver)a();else if(!(E||e.sq.revealed||e.sq.flagged&&1===n.nativeEvent.which))if("down"===t){S=!0,console.log("mouse down on "+e.id);var c=D.mouseDown(n.nativeEvent.which,e);k=c.which,e.changeFace(c.face)}else"up"===t&&(console.log("mouse up on "+e.id),E||o(k))},r=function(t){if(e.gameOver)a();else if(!(e.gameOver||S||e.sq.revealed))if("start"===t)E=!0,console.log("touch started on "+e.id),e.changeFace(D.touchStart(e.sq.flagged).face),n.current=setInterval((function(){A++,console.log(A)}),800);else if("end"===t){console.log("touch ended on "+e.id),clearInterval(n.current);var c=D.touchEnd(A);if(e.sq.flagged&&"left"===c.which)return void e.changeFace(c.face);o(c.which)}},o=function(n){k="left",A=0,e.onClick(e.sq.row,e.sq.col,n)};return Object(l.jsx)("button",{className:"".concat(N.a.grid_square," windows95 ").concat(e.sq.revealed&&N.a.clicked_square),onMouseDown:function(e){return c(e,"down")},onMouseUp:E?void 0:function(e){return c(e,"up")},onTouchStart:function(){return r("start")},onTouchEnd:S?void 0:function(){return r("end")},onContextMenu:function(e){return e.preventDefault()},children:Array.isArray(e.sq.display)?String.fromCharCode(e.sq.display[0],e.sq.display[1]):e.sq.display})},R=a(14),M=a.n(R),z=function(e){return e.boardGrid.map((function(n,a){return Object(l.jsx)("div",{className:M.a.board_row,children:n.map((function(n){return Object(l.jsx)(F,{id:n.key,sq:n,onClick:e.handleSquareClick,changeFace:e.setFace,gameOver:!e.gameInProgress},n.key)}))},"row-".concat(a))}))},B=function(e,n){return[n-1>=0?e[n-1]:null,e[n],n+1<e.length?e[n+1]:null]},G=function(e,n){return Array.from(Array(e),(function(e,a){return Array.from(Array(n),(function(e,n){return function(e,n){return{key:"cell-"+e+"-"+n,row:e,col:n,ant:!1,revealed:!1,display:v.unclicked,flagged:!1,nearbyAnts:0,neighbors:[]}}(a,n)}))}))},I=function(e,n){for(var a=Array.from(Array(e),(function(e,n){return{id:n+1,ant:!1}})),t=0;t<n;t++)a[t].ant=!0;return function(e){for(var n=e.length-1;n>0;n--){var a=Math.floor(Math.random()*(n+1)),t=[e[a],e[n]];e[n]=t[0],e[a]=t[1]}return e}(a)},J=function(e){return e.forEach((function(n,a){n.forEach((function(n,t){var c=0,r=function(e,n,a){var t=n-1>=0?B(e[n-1],a):[null,null,null],c=B(e[n],a),r=n+1<e.length?B(e[n+1],a):[null,null,null];return t.concat(c,r)}(e,a,t);r.forEach((function(e){e&&e.ant&&c++})),n.nearbyAnts=c,n.neighbors=r.filter((function(e){return null!==e}))}))})),e},U=function(e){var n=e.rows,a=e.cols,t=e.ants,c=function(e,n,a){var t=I(n,a),c=n-1,r=[];return e.forEach((function(e){e.forEach((function(e){e.ant=t[c].ant,c--,e.ant&&r.push(e.key)}))})),[e,r]}(G(n,a),n*a,t),r=Object(d.a)(c,2),o=r[0],i=(r[1],J(o));return console.log(i),i},P=function e(n,a){return n.neighbors.forEach((function(n){a[n.row][n.col].revealed||(a[n.row][n.col]=Object(O.a)(Object(O.a)({},n),{},{revealed:!0,display:0===n.nearbyAnts?"":n.nearbyAnts}),0===n.nearbyAnts&&(a=e(n,a)))})),a},W=a(9),H=a.n(W),T=function(){var e=Object(t.useState)([]),n=Object(d.a)(e,2),a=n[0],c=n[1],r=Object(t.useState)(!1),o=Object(d.a)(r,2),i=o[0],s=o[1],_=Object(t.useState)({rows:8,cols:8,ants:10}),f=Object(d.a)(_,2),g=f[0],b=(f[1],Object(t.useState)(y.sleeping)),j=Object(d.a)(b,2),m=j[0],p=j[1],h=Object(t.useState)(0),w=Object(d.a)(h,2),v=w[0],D=w[1],C=Object(t.useCallback)((function(e,n,t){var r=Object(u.a)(a),o=a[e][n];console.log("handling a "+t+" click for:"),console.log(o);var i=q.routeClick(o,t,v);r[e][n]=i.square,0===i.square.nearbyAnts&&(r=function(e,n){var a=n;return e.neighbors.forEach((function(e){n[e.row][e.col].revealed||(n[e.row][e.col]=Object(O.a)(Object(O.a)({},e),{},{revealed:!0,display:0===e.nearbyAnts?"":e.nearbyAnts}),0===e.nearbyAnts&&(n=P(e,n)))})),a}(i.square,r)),c(r),p(i.face),D(i.flags),s(i.continue)}),[a,v]);return Object(l.jsx)("section",{className:H.a.window__inner,children:Object(l.jsxs)("div",{className:H.a.board__outer,children:[Object(l.jsx)(x,{startGame:function(){c([]),c(U(g)),s(!0),p(y.smiling),D(g.ants)},inProgress:i,face:m,flags:v}),Object(l.jsx)("section",{className:H.a.board__inner,children:a?Object(l.jsx)(z,{boardGrid:a,handleSquareClick:C,setFace:p,gameInProgress:i}):null})]})})},L=a(15),V=a.n(L),Y=function(){return Object(l.jsxs)("main",{className:"windows95 ".concat(V.a.main_window),children:[Object(l.jsx)(_,{}),Object(l.jsx)(T,{})]})},K=a(16),X=a.n(K),Z=function(){return Object(l.jsxs)("footer",{className:"windows95 ".concat(X.a.windows_footer),children:[Object(l.jsx)("span",{}),Object(l.jsx)("span",{})]})},Q=a(17),$=a.n(Q);var ee=function(){return Object(l.jsxs)("div",{className:$.a.App,children:[Object(l.jsx)(Y,{}),Object(l.jsx)(Z,{})]})};o.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(ee,{})}),document.getElementById("root"))}],[[25,1,2]]]);
//# sourceMappingURL=main.eb548f75.chunk.js.map