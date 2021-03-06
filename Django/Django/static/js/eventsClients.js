/*
 Author: cleanet
 cleannet29@gmail.com
 Licensed by GNU GENERAL PUBLIC LICENSE VERSION 3
 This file is part of ClassAdmin.
 ClassAdmin is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 ClassAdmin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 You should have received a copy of the GNU General Public License along with ClassAdmin. If not, see <https://www.gnu.org/licenses/>.
 Copyright 2022 cleanet
*/
import {messg,getCookie} from './init.js';
// listPrograms div
const containerListPrograms = document.querySelector("#pageDashboard div#listPrograms")
export let jsonPrograms={};
export const editHostName=async(e)=>{
    let node = e.target;
    let id = node.parentNode.parentNode.parentNode.dataset.id;
    let hostname = node.parentNode.parentNode.querySelector("form input#hostname").value;
    try{
        let request = await fetch("./",{
            method:"POST",
            body:`action=editHostName&id=${id}&hostname=${hostname}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json()
        if(data.result){
            messg(`hostname edited successfully to ${hostname}`,true);
        }else{
            messg("Error at edit the hostname",false);
        }
    }catch(error){
        messg(`Unexpected error at edit hostname: ${error}`,false);
    }
}

export const shutdownComputer=async(node)=>{
    let id = node.parentNode.parentNode.dataset.id;
    try{
        let request = await fetch("./",{
            method:"POST",
            body:`action=shutdownHost&id=${id}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json()
        if(data.result){
            messg("Computer powered off successfully",true);
        }else{
            messg("Error at power off the computer",false);
        }
    }catch(error){
        messg(`Unexpected error at power off the computer: ${error}`,false);
    }
}

export const rebootComputer=async(node)=>{
    let id = node.parentNode.parentNode.dataset.id;
    try{
        let request = await fetch("./",{
            method:"POST",
            body:`action=rebootHost&id=${id}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json()
        if(data.result){
            messg("Computer restarted successfully",true);
        }else{
            messg("Error at restart the computer",false);
        }
    }catch(error){
        messg(`Unexpected error at restart the computer: ${error}`,false);
    }
}
export const suspendComputer=async(node)=>{
    let id = node.parentNode.parentNode.dataset.id;
    try{
        let request = await fetch("./",{
            method:"POST",
            body:`action=suspendHost&id=${id}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json()
        if(data.result){
            messg("the computer suspended successfully",true);
        }else{
            messg("Error at suspend the computer",false);
        }
    }catch(error){
        messg(`Unexpected error at suspend the computer: ${error}`,false);
    }
}
export const sendAlert=async(node,type,title,description)=>{
    let id = node.parentNode.parentNode.parentNode.dataset.id;
    try{
        let request = await fetch("./",{
            method:"POST",
            body:`action=sendAlert&id=${id}&type=${type}&title=${title}&description=${description}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json()
        if(data.result){
            messg("The alert has been sent at client successfully",true);
        }else{
            messg("Error at send the alert at client",false);
        }
    }catch(error){
        messg(`Unexpected error at send a alert at computer: ${error}`,false);
    }
}

export const screenshot=async(node)=>{
    try{
        let id = node.parentNode.parentNode.dataset.id;
        let request = await fetch("./",{
            method:"POST",
            body:`action=screenshot&id=${id}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json()
        if(data.result){
            messg("The client desktop has been captured successfully",true);
        }else{
            messg("Error at capture the client desktop",false);
        }
    }catch(error){
        messg(`Unexpected error at capture the client desktop: ${error}`,false);
    }
}

export const printListPrograms=(search)=>{
    document.querySelector("#pageDashboard div#listPrograms > form > div").innerHTML="";
    let name;
    let increment=0;
    for(let exe in jsonPrograms){
        if(!search || String(exe).toUpperCase().includes(search.toUpperCase())){
            let attr;
            (jsonPrograms[exe][0]==name)?increment++:increment=0;
            let id=`${jsonPrograms[exe][0]}-${increment}`;
            if(jsonPrograms[exe][1]){
                attr="checked"
            }else if(jsonPrograms[exe][1]==null){
                attr="disabled"
            }else{
                attr=""
            }
            document.querySelector("#pageDashboard div#listPrograms > form > div").innerHTML+=`
                <label for="${id}">
                    <input type="checkbox" id="${id}" title="${exe}" data-name="${jsonPrograms[exe][0]}" ${attr}>
                    <span></span>
                    ${exe}
                </label>
            `;
            name=jsonPrograms[exe][0];
        }
    }
}

export const listPrograms=async(node)=>{
    try{
        let id = node.parentNode.parentNode.dataset.id;
        let request = await fetch("./",{
            method:"POST",
            body:`action=listPrograms&id=${id}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json();
        jsonPrograms=data.result;
        printListPrograms();
        if(data.result){
            document.querySelector("#pageDashboard div#listPrograms > span > span").textContent=node.parentNode.parentNode.querySelector(".info .hostname").textContent;
            document.querySelector("#pageDashboard div#listPrograms").dataset.id=node.parentNode.parentNode.dataset.id;
            document.querySelector("#pageDashboard div#listPrograms").style.display="flex";
        }else{
            messg("Error at load the client computer programs",false);
        }
    }catch(error){
        messg(`Unexpected error at capture the client desktop: ${error}`,false);
    }
}

const fetchProgramsDeny=async(id,list)=>{
    let request = await fetch("./",{
        method:"POST",
        body:`action=denyPrograms&id=${id}&list=${list}`,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
            "X-CSRFToken":getCookie("csrftoken")
        }
    });
    let data = await request.json();
    if(data.result){
        messg("The programs selected has denied in the client computer successfully",true);
    }else{
        messg("Error unexpected at deny the programs in the client computer",false)
    }
}

export const denyPrograms=async(e)=>{
    let programs = Object.keys(jsonPrograms).filter(key=>jsonPrograms[key][1]==true);
    let listPrograms=[];
    console.log(programs);
    programs.filter(el=>listPrograms.push(jsonPrograms[el][0]))
    let data = (programs.length==0)?null:listPrograms;
    await fetchProgramsDeny(e.target.parentNode.parentNode.dataset.id,data);
}

export const deleteClient=async(node)=>{
    let id = node.parentNode.parentNode.dataset.id;
    try{
        let request = await fetch("./",{
            method:"POST",
            body:`action=deleteClient&id=${id}`,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                "X-CSRFToken":getCookie("csrftoken")
            }
        });
        let data = await request.json()
        if(data.result){
            messg("The client has deleted successfully",true);
        }else{
            messg("Error at delete the client",false);
        }
    }catch(error){
        messg(`Unexpected error at delete and uninstall the client: ${error}`,false);
    }
}