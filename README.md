<p align='center'>
  <img src='/static/images/github-splash.png' alt='무슨역' width='512' />
  <h2 align='center'>Wordle for Seoul Metro stations</h2>
</p>
<p align='center'>
  <img src="https://img.shields.io/badge/typescript-3178c6?logo=typescript&style=for-the-badge&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/svelte-F63B01?logo=svelte&style=for-the-badge&logoColor=white" alt="Svelte">
  <img src="https://img.shields.io/badge/sqlite-1179C8?logo=sqlite&style=for-the-badge&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/eslint-4B32C3?logo=eslint&style=for-the-badge" alt="ESlint">
  <img src="https://img.shields.io/badge/prettier-1b2b35?logo=prettier&style=for-the-badge" alt="Prettier">
</p>
<p align="center"><em>이 프로젝트는 서울 서울교통공사나 코레일과 제휴, 승인 또는 연결되어 있지 않습니다.</em></p>

## About
This game is just like *Wordle*, but you guess Seoul metro stations. Rather than letters, your hints are:
 - Lines
 - Direction to objective


<p align='center'>
<a href="https://jihacheol.leflon.fr/">
  <img src="https://img.shields.io/badge/play%20now!-272f3b?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48cGF0aCBkPSJNMTI5IDExMWMtNTUgNC05MyA2Ni05MyA3OEwwIDM5OGMtMiA3MCAzNiA5MiA2OSA5MWgxYzc5IDAgODctNTcgMTMwLTEyOGgyMDFjNDMgNzEgNTAgMTI4IDEyOSAxMjhoMWMzMyAxIDcxLTIxIDY5LTkxbC0zNi0yMDljMC0xMi00MC03OC05OC03OGgtMTBjLTYzIDAtOTIgMzUtOTIgNDJIMjM2YzAtNy0yOS00Mi05Mi00MmgtMTV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+" alt="Play now!">
</a>
</p>

## Installation
### Clone this repository
```bash
git clone https://github.com/leflon/jihacheol.git
```
or
```
gh repo clone leflon/jihacheol
```

### Install environment
### Install dependencies
```bash
npm install
```

### Fetch necessary data

This project uses **Seoul Metro's Cyber Station** web page to retrieve all seoul metro lines and stop.

In order to populate your SQLite database, first access [Cyber Station](http://www.seoulmetro.co.kr/en/cyberStation.do) and **download the page** (simply hit Ctrl/Cmd+S on any web browser).

Then, place the downloaded file at the root of the project and name it **`cyberStation.html`**.


Now, run the **fetch.ts** script:
```bash
node fetch.ts
```
This will:
 - **Populate the SQLite database**
 - **Generate the `src/assets/map.svelte` component**, in charge of displaying the Seoul Metro map on


### Populate env variables
Rename `.env.example` to `.env` and fill in the values.

### Start the dev environment
```bash
bun run dev
```

## Author
Paul Leflon
