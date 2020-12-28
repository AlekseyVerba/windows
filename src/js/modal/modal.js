export default function modal() {
    function modalShow(openSelector, popupSelector, closeSelector) {
        const open = document.querySelectorAll(openSelector),
        popup = document.querySelector(popupSelector),
        close = popup.querySelector(closeSelector);

        open.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                popup.style.display = "block";
                document.querySelector("body").style.overflow = "hidden";
            });
        })
        close.addEventListener("click", (e) => {
            e.preventDefault();
            popup.style.display = "none";
            document.querySelector("body").style.overflow = "visible";
        });
    }
    function install() {
        modalShow(".popup_engineer_btn", ".popup_engineer", ".popup_close");
        modalShow(".phone_link", ".popup", ".popup_close");
    }
    install();
}