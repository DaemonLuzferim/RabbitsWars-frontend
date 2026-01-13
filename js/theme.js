const panel=document.getElementById("themePanel");
document.getElementById("themeBtn").onclick=()=>{
  panel.classList.toggle("hidden");
  panel.innerHTML=`
    <button onclick="setMode('bg')">Fondo</button>
    <button onclick="setMode('title')">Títulos</button>
    <button onclick="setMode('text')">Párrafos</button>
    <div id="colors"></div>`;
};

const darkColors=[
"#0d0d0d","#120000","#001a00","#001020","#1a0000",
"#080808","#002020","#120012","#111111","#050505",
"#101820","#1b1b1b","#0a0a0a","#020202","#1f0000",
"#002b36","#001f2d","#0b132b","#1c0f13","#090909"
];

function setMode(type){
  const c=document.getElementById("colors");
  c.innerHTML="";
  darkColors.forEach(col=>{
    const d=document.createElement("div");
    d.style.background=col;
    d.style.height="40px";
    d.onclick=()=>document.documentElement.style
      .setProperty(`--${type==="bg"?"bg":type==="title"?"title":"text"}`,col);
    c.appendChild(d);
  });
}