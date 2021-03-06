# Author: cleanet
# cleannet29@gmail.com
#
# Licensed by GNU GENERAL PUBLIC LICENSE VERSION 3
# This file is part of ClassAdmin.
# ClassAdmin is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
# ClassAdmin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
# You should have received a copy of the GNU General Public License along with ClassAdmin. If not, see <https://www.gnu.org/licenses/>.
# Copyright 2022 cleanet
#
# This script allows edit the hostname. Used for the funcionally of edit hostanme.
#

Param(
    [String] $newHostname
)
if(!$newHostName){
    Write-Host '[!]' -ForegroundColor Red -NoNewline;
    Write-Host ' The script needs one argument.';
    Write-Host '    editHostName.ps1 -newHostName <name>';
    exit;
}
Write-Host "Changing the hostname by $newHostname " -NoNewline;
Rename-Computer -ComputerName $env:COMPUTERNAME -NewName $newHostname -Restart;