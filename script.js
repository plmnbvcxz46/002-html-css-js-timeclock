MicroModal.init({
  onClose: () => {
    // 当模态框以任何方式关闭时（关闭按钮、遮罩、Esc），清理选择并更新样式
    tz = null;
    focusitem();
  },
});
const precise = document.querySelector(".time-precise");
const rough = document.querySelector(".time-rough");
const tzlist = document.querySelector(".list");
let tzitems;
var currentZone = dayjs.tz.guess();
var tz;

precise.innerText = dayjs().format("HH:mm:ss");
rough.innerText = dayjs().format("dddd, D MMM, YYYY");
setInterval(() => {
  const now = dayjs().tz(currentZone);
  precise.innerText = now.format("HH:mm:ss");
  rough.innerText = now.format("dddd, D MMM, YYYY");
}, 1000);

const commonTimezones = [
  "UTC",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
];
tzlist.innerHTML = commonTimezones
  .map((zone) => {
    return `<li class="item-list">${zone}</li>`;
  })
  .join(" ");

// 现在元素已插入 DOM，查询并保存列表项引用
tzitems = document.querySelectorAll(".item-list");

tzitems.forEach((item) => {
  item.addEventListener("click", () => {
    tz = item;
    focusitem();
  });
});
const applay = document.querySelector(".applay");
applay.addEventListener("click", () => {
  setzone();
  MicroModal.close("modal-1");
});
function focusitem() {
  tzitems.forEach((item) => {
    if (item === tz) {
      item.classList.add("focus");
    } else item.classList.remove("focus");
  });
}

const locationbtn = document.querySelector(".location");
locationbtn.innerText = dayjs.tz.guess();

function setzone() {
  currentZone = tz.innerText;
  locationbtn.innerText = currentZone;
  console.log(currentZone);
}
