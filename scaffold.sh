dotnet new sln -n Gwn
dotnet new webapi -o Gwn.Service -f "net8.0" -controllers
dotnet sln Gwn.sln add Gwn.Service/Gwn.Service.csproj

dotnet new classlib -f "net8.0" -o Cities.Lib
dotnet sln Gwn.sln add Cities.Lib/Cities.Lib.csproj