let MODE = "individu"; // individu | kelompok | total
let pieInfChart, pieNonInfChart, lineChart, barChart, table;
const format = n => n.toLocaleString("id-ID");

tailwind.config = {
  darkMode: 'class',
}

/* ===== Dark Mode ===== */
const toggleBtn = document.getElementById('themeToggle');

if(localStorage.theme === 'dark'){
  document.documentElement.classList.add('dark');
}

toggleBtn.onclick = () => {
  document.documentElement.classList.toggle('dark');
  localStorage.theme =
    document.documentElement.classList.contains('dark')
    ? 'dark' : 'light';
}

/* ===== Segmented Control ===== */
function setMode(index){
  const indicator = document.getElementById('indicator');
  indicator.style.transform = `translateX(${index*100}%)`;
}

/* ===== Remove Skeleton After Load ===== */
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.querySelectorAll('.skeleton')
      .forEach(el=>el.classList.remove('skeleton'));
  },1200);
});