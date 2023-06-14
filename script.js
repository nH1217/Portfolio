console.log('hi');

// variable for the toggle button
const menuButton = document.querySelector('.menu-toggle');

// variable for the nav element
const nav = document.querySelector('nav');

console.log(menuButton);
console.log(nav);

// funtion, which listens for the user to click the menu button
// when the user clicks the button, add the open class to the nav element

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// grab all link elements inside the navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});
console.log(navLinks);

// Fetch Github

fetch('https://api.github.com/users/lily-fitz/repos')
  .then((response) => response.json())
  .then((data) => {
    // sort by date
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // limit the number to 6
    const limitedData = data.slice(0, 6);

    // repositories container variable
    const reposContainer = document.getElementById('reposContainer');

    // loop through the repos, grab properties
    for (let i = 0; i < limitedData.length; i++) {
      const repo = limitedData[i];

      const repoInfoDiv = document.createElement('div');
      // Add a class
      repoInfoDiv.classList.add('repo-info');

      repoInfoDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p class="desc">${repo.description || ''}</p>
        <ul id="language-${repo.name}"></ul>
        <a href="${repo.html_url}" target="_blank">View on Github &rarr;</a>
        `;

      reposContainer.appendChild(repoInfoDiv);

      fetch(repo.languages_url)
        .then((response) => response.json())
        .then((languagesData) => {
          const languagesList = document.getElementById(
            `language-${repo.name}`
          );

          Object.keys(languagesData).forEach((language) => {
            const newLanguageEl = document.createElement('li');
            newLanguageEl.textContent = language;
            languagesList.appendChild(newLanguageEl);
          });
        });
    }
  })
  .catch((error) => {
    console.error(error);
  });


  // GSAP Animation

  const tl = gsap.timeline({
    default: {
      ease: 'power1.out', 
    },
  })

  tl.to('.welcome', { y: 0, duration: .8 })
tl.to('.name-title', { y: 0, duration: 1.1, stagger: 0.5 }, '-=.3')
tl.fromTo('.contact', { opacity: 0 }, { opacity: 1, duration: 1 })
