const user="gsrodriguesz";
const repo="algorithm-notebook";
const branch="main";

const treeDiv=document.getElementById("tree");
const content=document.getElementById("content");


async function loadRepo(){

    const response=await fetch(
`https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
    );

    const data=await response.json();

    createTree(data.tree);

}


function createTree(files){

    const structure={};

    files.forEach(file=>{

        const parts=file.path.split("/");

        let current=structure;

        parts.forEach((part,index)=>{

            if(index===parts.length-1){

                current[part]=file;

            }else{

                current[part] ??= {};
                current=current[part];

            }

        });

    });

    renderTree(structure,treeDiv);

}


function renderTree(obj,parent){

    Object.keys(obj)
    .sort()
    .forEach(key=>{

        const value=obj[key];

        const div=document.createElement("div");

        if(value.path){

            div.className="item file";
            div.innerText="📄 "+key;

            div.onclick=()=>loadFile(value.path);

        }else{

            div.innerHTML=
                `<div class="item folder-name">
                📁 ${key}
                </div>`;

            const child=document.createElement("div");
            child.className="folder";

            renderTree(value,child);

            div.appendChild(child);

        }

        parent.appendChild(div);

    });

}


async function loadFile(path){

    const rawURL=
`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;

    const response=await fetch(rawURL);

    const text=await response.text();

    content.innerHTML="";

    const title=document.createElement("h2");
    title.innerText=path;

    content.appendChild(title);

    if(path.endsWith(".md")){

        const div=document.createElement("div");
        div.innerHTML=marked.parse(text);

        content.appendChild(div);

    }else{

        const pre=document.createElement("pre");
        pre.textContent=text;

        content.appendChild(pre);

    }

}


loadRepo();