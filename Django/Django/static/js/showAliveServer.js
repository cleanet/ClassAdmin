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
this.onmessage=async(e)=>{
    setInterval(async()=>{
            let res = await fetch("https://classadmin.server/dashboard/",{
                method:"POST",
                body:"action=keepAlive",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                    "X-CSRFToken":e.data[0]
                }
            });
            let data = await res.json();
            this.postMessage(data)
    },3000);
}