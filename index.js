function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const name = 'data-username="' + repo.owner.login + '"'
    const repoName = 'data-repository=" ' + repo.name + '"'
    return(`
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${repoName} ${name} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${repoName} ${name} onclick="getBranches(this)">Get Branches</a><br>
      </li>
        `)
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const link = "https://api.github.com/repos/" + el.dataset.username + "/" + repoName + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", link)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const link = "https://api.github.com/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", link)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
