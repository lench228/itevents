const n =  new Date();
const monthDate = n.getMonth();
const dayDate = n.getDate();

document.querySelector(".entrance__date .entrance__day").textContent = dayDate < 10 ? '0' + dayDate : dayDate;
document.querySelector(".entrance__date .entrance__month").textContent =  monthDate < 10 ? '0' + (monthDate + 1) : monthDate + 1; 