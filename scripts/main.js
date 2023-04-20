let showMenu = document.getElementById(`menu`),
    menuNav = document.querySelector(`nav`),
    showDropMenu = document.getElementById(`dropMenu`),
    showModal = document.getElementById(`modal`),
    modalPanel = document.getElementsByClassName(`modal-panel`)[0],
    modalPane = document.getElementsByClassName(`modal-content-pane`)[0],
    threshold = 736,
    dropDown = false,
    sideTray = false,
    notVisible = true,
    modalNotVisible = true;

function resetDisplay () {
    if (window.innerWidth > threshold) {
        showDropMenu.style.display = `flex`;
        menuNav.style.margin = `0 auto`;
        menuNav.style.top = 0;
        menuNav.style.left = 0;
        menuNav.style.right = 0;
        menuNav.style.bottom = 0;
        menuNav.style.transform = `translateY(0)`;
    }
    else {
        showDropMenu.style.display = `grid`;
        menuNav.style.top = `96px`;
        menuNav.style.transform = `translateX(-150px)`;
    }
}

function displayMenu () {
    if (window.innerWidth > threshold && notVisible === true) {
        dropDown = true;
        showDropMenu.style.display = `flex`;
        menuNav.style.marginLeft = ``;
        notVisible = false;
    }
    else if (window.innerWidth > threshold && notVisible === false) {
        dropDown = false;
        notVisible = true;
    }
    else if (window.innerWidth <= threshold && notVisible === true) {
        sideTray = true;
        showDropMenu.style.display = `grid`;
        menuNav.style.top = `96px`;
        menuNav.style.marginLeft = `-150px`;
        notVisible = false;
    }
    else {
        sideTray = false;
        menuNav.style.top = `96px`;
        menuNav.style.marginLeft = `-150px`;
        notVisible = true;
    }
}

window.onload = () => {
    menuNav.style.visibility = `hidden`;
    displayMenu();
};

window.onresize = () => {
    resetDisplay();
    displayMenu();
};

showMenu.addEventListener(`click`, () => {
    if (window.innerWidth > threshold && dropDown === true) {
        dropDown = false;
        menuNav.style.transform = `translateY(96px)`;
        menuNav.style.visibility = `visible`;
    }
    else if (window.innerWidth > threshold && dropDown === false) {
        dropDown = true;
        menuNav.style.transform = `translateY(0)`;
        menuNav.style.visibility = `hidden`;
    }
    else if (window.innerWidth <= threshold && sideTray === true) {
        sideTray = false;
        menuNav.style.transform = `translateX(150px)`;
        menuNav.style.visibility = `visible`;
    }
    else {
        sideTray = true;
        menuNav.style.transform = `translateX(-150px)`;
        menuNav.style.visibility = `hidden`;
    }
});

showModal.addEventListener(`click`, () => {
    if (modalNotVisible === true) {
        modalPanel.style.visibility = `visible`;
        modalPane.style.visibility = `visible`;
        modalNotVisible = false;
    }
});

modalPanel.addEventListener(`click`, () => {
    if (modalNotVisible === false) {
        modalPanel.style.visibility = `hidden`;
        modalPane.style.visibility = `hidden`;
        modalNotVisible = true;
    }
});

document.addEventListener(`keydown`, (event) => {
    if (event.key === `Escape`) {
        modalPanel.style.visibility = `hidden`;
        modalPane.style.visibility = `hidden`;
        modalNotVisible = true;
    }
});
