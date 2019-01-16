## Språkkraft website
Språkkraft is a Swedish NGO that focuses at increasing the integration rate of immigrants, refugees and newly arrived people to Sweden through Swedish language learning.

## Installation
**1. Install node modules**  
`npm install`

**2. Install Gulp CLI:**   
`npm install --global gulp-cli`

**3. Serve website on localhost**   
`gulp`

## Deployment:
**1. Upload** the content of **dist** dir to server **web** dir.

**2. On server:**   
`cd web`   
`sudo ./to-production.sh`   
OR   
`sudo cp -r ~/web/* ~/poly/brainglass/NodeServer/public-api-server/public`
