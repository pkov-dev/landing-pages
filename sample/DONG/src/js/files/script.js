// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

const plItems = document.querySelectorAll('.pl-func');
const prItems = document.querySelectorAll('.pr-func');

const containerWidth = 1560;
let paddingValue;

function calcPadding() {
  if (window.innerWidth < containerWidth + 30) {
    paddingValue = 15;
  } else {
    paddingValue = (window.innerWidth - containerWidth) / 2;
  }
  if (plItems.length) {
    plItems.forEach((plItem) => {
      plItem.style.paddingLeft = paddingValue + 'px';
    });
  }
  if (prItems.length) {
    prItems.forEach((prItem) => {
      prItem.style.paddingRight = paddingValue + 'px';
    });
  }
}
calcPadding();
document.body.onresize = calcPadding;

async function copyContactAdressFunc(e) {
  try {
    const targetBtn = e.target.closest('.copy-ca-btn');
    const tokenValue = targetBtn.textContent.trim();
    await navigator.clipboard.writeText(tokenValue);
    alert('Address copied successfully');
  } catch (error) {
    console.error(error.message);
  }
}

const copyContactAdressButtons = document.querySelectorAll('.copy-ca-btn');

copyContactAdressButtons.forEach((copyContactAdressButton) => {
  copyContactAdressButton.onclick = copyContactAdressFunc;
});
