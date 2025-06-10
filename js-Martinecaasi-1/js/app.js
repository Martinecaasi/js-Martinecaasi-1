const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const errorContainer = document.getElementById('errorContainer');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

let items=[];
let filteredItems=[];


//Fetch Data
fetch('data/items.json').then(res=> res.json()).then(data=>{
        items=data;
        filteredItems=[...items];
        renderCards(filteredItems);
        applyStoredTheme();
        })
        .catch(err=>{
                errorContainer.textContent='Failed to load items';
        });

//Render function
function renderCards(data) {
  cardsContainer.innerHTML = '';
  if (data.length === 0) {
          errorContainer.textContent = 'No items found.';
          return;
  }
  errorContainer.textContent = '';
          data.forEach(item => {
          const card = document.createElement('div');
          card.className = 'col card-custom';

          card.innerHTML = `
          <div class="card h-100">
                    <div class="card-img-container">
                    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'" />
                    </div>
                    <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <h6 class="card-subtitle">${item.author}</h6>
                    <p class="card-text">${item.description}</p>
                    <span class="badge badge-author">${item.author}</span>
                    </div>
          </div>
          `;
          cardsContainer.appendChild(card);
          });
}

//Search
searchInput.addEventListener('input',()=>{
          const query = searchInput.value.toLowerCase();
          filteredItems=items.filter(item=>
                    item.title.toLocaleLowerCase().includes(query)|| item.author.toLocaleLowerCase().includes(query)
          );
          applySort();
          renderCards(filteredItems);
});

//Sort
sortSelect.addEventListener('change', applySort);

function applySort(){
          const val=sortSelect.value;
          if(val.includes('title')){
                    filteredItems.sort((a,b)=> a.title.localeCompare(b.title));
                    if(val==='title-desc') filteredItems.reverse();
          }else if(val.includes('author')){
                    filteredItems.sort((a,b)=> a.author.localeCompare(b.author));
                    if(val==='author-desc') filteredItems.reverse();
          }
          renderCards(filteredItems);
}

//Theme toggle
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


//Apply saved theme
function applyStoredTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const isDark = savedTheme === 'dark';

  if (isDark) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

