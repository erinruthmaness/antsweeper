(this.webpackJsonpantsweeper=this.webpackJsonpantsweeper||[]).push([[0],[,,,function(e,n,a){e.exports={page_nav:"Nav_page_nav__vDmiy",menu_bar:"Nav_menu_bar__1GFe8",menu_bar__left:"Nav_menu_bar__left__2-N_-",game_title:"Nav_game_title__1jH2S",menu_bar__right:"Nav_menu_bar__right__1h9Yg",windows95_button:"Nav_windows95_button__1EptJ",wc_box:"Nav_wc_box__1UbMO",wc_minimize:"Nav_wc_minimize__3_MRO",wc_maximize:"Nav_wc_maximize__229wl",wc_close:"Nav_wc_close__2orTD",dropdown_menu:"Nav_dropdown_menu__FWZOg",dropdown_choice:"Nav_dropdown_choice__1O6zs"}},,function(e,n,a){e.exports={calc_screen:"CalcScreen_calc_screen__3tjOL",calc_screen__digit:"CalcScreen_calc_screen__digit__pVuWc",digit_half:"CalcScreen_digit_half__tHRsU",digit_0:"CalcScreen_digit_0__1B8dK",num_top:"CalcScreen_num_top__1L84O",num_bottom:"CalcScreen_num_bottom__1Ml-A",digit_4:"CalcScreen_digit_4__1Ng4d",digit_1:"CalcScreen_digit_1__3hmyY",digit_7:"CalcScreen_digit_7__fJeE-",digit_2:"CalcScreen_digit_2__11c0d",digit_5:"CalcScreen_digit_5__3bn83",digit_3:"CalcScreen_digit_3__2pnmt",digit_9:"CalcScreen_digit_9__EzkXc",digit_6:"CalcScreen_digit_6__1tb4a"}},,function(e,n,a){e.exports={board_controls:"Controls_board_controls__Ccfad",calc_screen__wrapper:"Controls_calc_screen__wrapper__2NflD"}},function(e,n,a){e.exports={grid_square:"Square_grid_square__1bEeJ",clicked_square:"Square_clicked_square__3OEAd",nearbys_0:"Square_nearbys_0__1NJh8",nearbys_1:"Square_nearbys_1__1Gpup",nearbys_2:"Square_nearbys_2__3-o0K",nearbys_3:"Square_nearbys_3__uldGt",nearbys_4:"Square_nearbys_4__3WvpZ",nearbys_5:"Square_nearbys_5__qatkp",nearbys_6:"Square_nearbys_6__1oNTw",nearbys_7:"Square_nearbys_7__dYwup",nearbys_8:"Square_nearbys_8__1-T5z",first_ant:"Square_first_ant__Ke5RM"}},,function(e,n,a){e.exports={window__inner:"Board_window__inner__aoiFq",board__outer:"Board_board__outer__3tOml",board__inner:"Board_board__inner__3wIj1"}},,,function(e,n,a){e.exports={control_button:"FaceButton_control_button__1J2Mc"}},function(e,n,a){e.exports={board_row:"SquaresWrapper_board_row__2C4Un"}},function(e,n,a){e.exports={main_window:"Window_main_window___OveE"}},function(e,n,a){e.exports={windows_footer:"Footer_windows_footer__1_U7x"}},function(e,n,a){e.exports={App:"App_App__23Vul"}},,,,,,function(e,n,a){},,function(e,n,a){"use strict";a.r(n);var t=a(2),c=a.n(t),r=a(12),o=a.n(r),s=(a(23),a(3)),i=a.n(s),_=a(0),l=function(){return Object(_.jsxs)("header",{className:i.a.page_nav,children:[Object(_.jsxs)("section",{className:i.a.menu_bar,children:[Object(_.jsxs)("span",{className:i.a.menu_bar__left,children:[String.fromCharCode("0xD83D","0xDC1C"),Object(_.jsx)("span",{className:i.a.game_title,children:"Antsweeper"})]}),Object(_.jsxs)("span",{className:"".concat(i.a.menu_bar__right," ").concat(i.a.wc_box),disabled:!0,children:[Object(_.jsx)("button",{className:i.a.wc_minimize}),Object(_.jsx)("button",{className:i.a.wc_maximize}),Object(_.jsx)("button",{className:i.a.wc_close})]})]}),Object(_.jsxs)("section",{className:i.a.dropdown_menu,children:[Object(_.jsx)("button",{className:i.a.dropdown_choice,children:"Game"}),Object(_.jsx)("button",{className:i.a.dropdown_choice,children:"Help"})]})]})},u=a(18),d=a(1),f=a(4),b=a(13),g=a.n(b),j=function(e){return Object(_.jsx)("button",{className:"windows95 ".concat(g.a.control_button),onClick:e.onClick,children:String.fromCharCode(e.face[0],e.face[1])})},m=function(e,n){return[n-1>=0?e[n-1]:null,e[n],n+1<e.length?e[n+1]:null]},p=function(e,n){return e+"_"+n.toString()},h=a(5),w=a.n(h),O=function(e){var n=e.display.toString().padStart(3,"0").split("");return n&&"off"!==n||(n=["8","8","8"]),Object(_.jsx)("section",{className:w.a.calc_screen,id:e.id,children:n.map((function(n,a){return Object(_.jsxs)("div",{className:"".concat(w.a.calc_screen__digit," ").concat(w.a[p("digit",n)]),children:[Object(_.jsx)("div",{className:"".concat(w.a.num_top," ").concat(w.a.digit_half)}),Object(_.jsx)("div",{className:"".concat(w.a.num_bottom," ").concat(w.a.digit_half)})]},"".concat(e.id,"-digit-").concat(a))}))})},x=a(7),v=a.n(x),y=function(e){var n=Object(t.useState)("off"),a=Object(f.a)(n,2),c=a[0],r=a[1],o=Object(t.useState)(!1),s=Object(f.a)(o,2),i=s[0],l=s[1];return Object(t.useEffect)((function(){var n;return i&&(n=setInterval((function(){r((function(e){return e+1})),console.log(c)}),1e3)),!e.inProgress&&c>0&&clearInterval(n),function(){clearInterval(n)}}),[c,i,e.inProgress]),Object(_.jsxs)("nav",{className:v.a.board_controls,children:[Object(_.jsx)("div",{className:v.a.calc_screen__wrapper,children:Object(_.jsx)(O,{id:"flags",display:i?e.flags:"off"})}),Object(_.jsx)("div",{className:v.a.face_button__wrapper,children:Object(_.jsx)(j,{onClick:function(){r(0),l(!0),e.startGame()},face:e.face})}),Object(_.jsx)("div",{className:v.a.calc_screen__wrapper,children:Object(_.jsx)(O,{id:"timer",display:i?c:"off"})})]})},q={unclicked:"?",clicked:"",ant:["0xD83D","0xDC1C"],flag:["0xD83D","0xDEA9"]},S={sleeping:["0xD83D","0xDE34"],smiling:["0xD83D","0xDE0A"],yelling:["0xD83D","0xDE31"],upsideDown:["0xD83D","0xDE43"],exploded:["0xD83E","0xDD2F"],shades:["0xD83D","0xDE0E"],xEyes:["0xD83D","0xDE35"],sweating:["0xD83D","0xDE13"],winking:["0xD83D","0xDE09"]},N={squareResponse:function(e,n){return{which:e,face:n}},touchStart:function(e){return e?N.squareResponse("touchStart",S.winking):N.squareResponse("touchStart",S.yelling)},touchEnd:function(e){return console.log("touch end count is "+e),e>0?N.squareResponse("right",S.smiling):N.squareResponse("left",S.smiling)},mouseDown:function(e,n){return 1===e?n.flagged?N.squareResponse("left",S.winking):N.squareResponse("left",S.yelling):n.flagged?N.squareResponse("right",S.sweating):N.squareResponse("right",S.smiling)}},D={routeClick:function(e,n,a){return"left"===n?D.leftClick(e,a):"right"===n?D.rightClick(e,a):void 0},leftClick:function(e,n){return e.flagged||e.revealed?{square:e,face:S.smiling}:e.ant?{square:Object(d.a)(Object(d.a)({},e),{},{display:q.ant,revealed:!0}),face:S.exploded,flags:n}:{square:Object(d.a)(Object(d.a)({},e),{},{display:0===e.nearbyAnts?"":e.nearbyAnts,revealed:!0}),face:S.smiling,flags:n}},rightClick:function(e,n){return e.flagged?{square:Object(d.a)(Object(d.a)({},e),{},{display:q.unclicked,revealed:!1,flagged:!1}),face:S.smiling,flags:n+1}:n>0?{square:Object(d.a)(Object(d.a)({},e),{},{display:q.flag,revealed:!1,flagged:!0}),face:S.smiling,flags:n-1}:{square:Object(d.a)({},e),face:S.smiling,flags:n}}},C=a(8),k=a.n(C),E=!1,A="left",R=!1,F=0;var M=function(e){var n=Object(t.useRef)(),a=function(){E=!1,A="left",R=!1,F=0},c=function(n,t){if(e.gameOver)a();else if(!(R||e.sq.revealed||e.sq.flagged&&1===n.nativeEvent.which))if("down"===t){E=!0,console.log("mouse down on "+e.id);var c=N.mouseDown(n.nativeEvent.which,e);A=c.which,e.changeFace(c.face)}else"up"===t&&(console.log("mouse up on "+e.id),R||o(A))},r=function(t){if(e.gameOver)a();else if(!(e.gameOver||E||e.sq.revealed))if("start"===t)R=!0,console.log("touch started on "+e.id),e.changeFace(N.touchStart(e.sq.flagged).face),n.current=setInterval((function(){F++,console.log(F)}),800);else if("end"===t){console.log("touch ended on "+e.id),clearInterval(n.current);var c=N.touchEnd(F);if(e.sq.flagged&&"left"===c.which)return void e.changeFace(c.face);o(c.which)}},o=function(n){A="left",F=0,e.onClick(e.sq.row,e.sq.col,n)};return Object(_.jsx)("button",{className:"\n        windows95 \n        ".concat(k.a.grid_square," \n        ").concat(e.sq.revealed&&k.a.clicked_square," \n        ").concat(k.a[p("nearbys",e.sq.nearbyAnts)],"\n        ").concat(e.sq.revealed&&e.sq.ant&&!e.sq.unclickedAnt&&k.a.first_ant," \n      "),onMouseDown:function(e){return c(e,"down")},onMouseUp:R?void 0:function(e){return c(e,"up")},onTouchStart:function(){return r("start")},onTouchEnd:E?void 0:function(){return r("end")},onContextMenu:function(e){return e.preventDefault()},children:Array.isArray(e.sq.display)?String.fromCharCode(e.sq.display[0],e.sq.display[1]):e.sq.display})},z=a(14),I=a.n(z),G=function(e){return e.boardGrid.map((function(n,a){return Object(_.jsx)("div",{className:I.a.board_row,children:n.map((function(n){return Object(_.jsx)(M,{id:n.key,sq:n,onClick:e.handleSquareClick,changeFace:e.setFace,gameOver:!e.gameInProgress},n.key)}))},"row-".concat(a))}))},J=function(e,n){return Array.from(Array(e),(function(e,a){return Array.from(Array(n),(function(e,n){return function(e,n){return{key:"cell-"+e+"-"+n,row:e,col:n,ant:!1,revealed:!1,display:q.unclicked,flagged:!1,nearbyAnts:0,neighbors:[]}}(a,n)}))}))},B=function(e,n){for(var a=Array.from(Array(e),(function(e,n){return{id:n+1,ant:!1}})),t=0;t<n;t++)a[t].ant=!0;return function(e){for(var n=e.length-1;n>0;n--){var a=Math.floor(Math.random()*(n+1)),t=[e[a],e[n]];e[n]=t[0],e[a]=t[1]}return e}(a)},L=function(e){return e.forEach((function(n,a){n.forEach((function(n,t){var c=0,r=function(e,n,a){var t=n-1>=0?m(e[n-1],a):[null,null,null],c=m(e[n],a),r=n+1<e.length?m(e[n+1],a):[null,null,null];return t.concat(c,r)}(e,a,t);r.forEach((function(e){e&&e.ant&&c++})),n.nearbyAnts=c,n.neighbors=r.filter((function(e){return null!==e}))}))})),e},P=function(e){var n=e.rows,a=e.cols,t=e.ants,c=function(e,n,a){var t=B(n,a),c=n-1,r=[];return e.forEach((function(e){e.forEach((function(e){e.ant=t[c].ant,c--,e.ant&&r.push(e.key)}))})),[e,r]}(J(n,a),n*a,t),r=Object(f.a)(c,2),o=r[0],s=r[1],i=L(o);return console.log(i),[i,s]},T=function e(n,a){return n.neighbors.forEach((function(n){a[n.row][n.col].revealed||(a[n.row][n.col]=Object(d.a)(Object(d.a)({},n),{},{revealed:!0,display:0===n.nearbyAnts?"":n.nearbyAnts}),0===n.nearbyAnts&&(a=e(n,a)))})),a},U=a(10),W=a.n(U),H=function(){var e=Object(t.useState)([]),n=Object(f.a)(e,2),a=n[0],c=n[1],r=Object(t.useState)(!1),o=Object(f.a)(r,2),s=o[0],i=o[1],l=Object(t.useState)({rows:8,cols:8,ants:10,antList:[]}),b=Object(f.a)(l,2),g=b[0],j=b[1],m=Object(t.useState)(S.sleeping),p=Object(f.a)(m,2),h=p[0],w=p[1],O=Object(t.useState)(0),x=Object(f.a)(O,2),v=x[0],N=x[1],C=Object(t.useCallback)((function(e,n,t){var r=Object(u.a)(a),o=a[e][n];console.log("handling a "+t+" click for:"),console.log(o);var s,_,l=D.routeClick(o,t,v);r[e][n]=l.square,l.square.revealed&&(l.square.ant&&(i(!1),s=r,_=g.antList,s.forEach((function(e,n){s.forEach((function(e,a){-1===_.indexOf(s[n][a].key)||s[n][a].revealed||s[n][a].flagged||(s[n][a]=Object(d.a)(Object(d.a)({},s[n][a]),{},{display:q.ant,revealed:!0,unclickedAnt:!0}))}))})),r=s),function(e,n){var a=n.rows*n.cols-n.ants;return e.forEach((function(n,t){e.forEach((function(n,c){!e[t][c].ant&&e[t][c].revealed&&a--}))})),0===a}(r,g)&&!l.square.ant&&(l.face=S.shades,i(!1)),0===l.square.nearbyAnts&&(r=function(e,n){var a=n;return e.neighbors.forEach((function(e){n[e.row][e.col].revealed||(n[e.row][e.col]=Object(d.a)(Object(d.a)({},e),{},{revealed:!0,display:0===e.nearbyAnts?"":e.nearbyAnts}),0===e.nearbyAnts&&(n=T(e,n)))})),a}(l.square,r))),c(r),w(l.face),N(l.flags)}),[a,v,g]);return Object(_.jsx)("section",{className:W.a.window__inner,children:Object(_.jsxs)("div",{className:W.a.board__outer,children:[Object(_.jsx)(y,{startGame:function(){c([]);var e=P(g),n=Object(f.a)(e,2),a=n[0],t=n[1];c(a),j(Object(d.a)(Object(d.a)({},g),{},{antList:t})),i(!0),w(S.smiling),N(g.ants)},inProgress:s,face:h,flags:v}),Object(_.jsx)("section",{className:W.a.board__inner,children:a?Object(_.jsx)(G,{boardGrid:a,handleSquareClick:C,setFace:w,gameInProgress:s}):null})]})})},K=a(15),Y=a.n(K),V=function(){return Object(_.jsxs)("main",{className:"windows95 ".concat(Y.a.main_window),children:[Object(_.jsx)(l,{}),Object(_.jsx)(H,{})]})},Z=a(16),X=a.n(Z),Q=function(){return Object(_.jsxs)("footer",{className:"windows95 ".concat(X.a.windows_footer),children:[Object(_.jsx)("span",{}),Object(_.jsx)("span",{})]})},$=a(17),ee=a.n($);var ne=function(){return Object(_.jsxs)("div",{className:ee.a.App,children:[Object(_.jsx)(V,{}),Object(_.jsx)(Q,{})]})};o.a.render(Object(_.jsx)(c.a.StrictMode,{children:Object(_.jsx)(ne,{})}),document.getElementById("root"))}],[[25,1,2]]]);
//# sourceMappingURL=main.3d551d97.chunk.js.map