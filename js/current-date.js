const n =  new Date();
const m = n.getMonth() + 1;
const d = n.getDate();
console.log(document.querySelector(".entrance__date"));
document.querySelector(".entrance__date .entrance__day").textContent = d;
document.querySelector(".entrance__date .entrance__month").textContent = m;