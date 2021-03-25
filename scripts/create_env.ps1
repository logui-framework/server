<#

LogUI Server First Run Script (Windows PowerShell version)
Creates an environment file, .env, for the Docker instance to use.

Author: David Maxwell
Date: 2021-03-25

#>

Add-Type -AssemblyName System.Web

$hostname = $env:computername
$secret_key = [System.Web.Security.Membership]::GeneratePassword(50,10).replace('=','!').replace('#','!')
$db_password = [System.Web.Security.Membership]::GeneratePassword(8,1).replace('=','!').replace('#','!')

Copy-Item ../.env.example -Destination ../.env

((Get-Content -path ../.env -Raw) -Replace '<<HOSTNAME>>', $hostname) | Set-Content -Path ../.env
((Get-Content -path ../.env -Raw) -Replace '<<KEY>>', $secret_key) | Set-Content -Path ../.env
((Get-Content -path ../.env -Raw) -Replace '<<PASSWORD>>', $db_password) | Set-Content -Path ../.env




