export default function modal() {
    function modalShow(openSelector, popupSelector, closeSelector) {
        const open = document.querySelectorAll(openSelector),
        popup = document.querySelector(popupSelector),
        close = popup.querySelector(closeSelector);

        open.forEach(item => {
            item.addEventListener("click", (e) => {
                popup.classList.add("animated", "fadeIn");
                popup.style.display = "block";
                document.querySelector("body").style.overflow = "hidden";
            });
        });

        // close.addEventListener("click", (e) => {
        //     popup.classList.remove("animated", "fadeIn");
        //     popup.style.display = "none";
        //     document.querySelector("body").style.overflow = "";
        // });

        
        popup.addEventListener("click", (e) => {
            if (e.target === popup || e.target.parentElement === popup.querySelector("[data-dinamika]") || 
                e.target.parentElement === popup.querySelector("[data-close]")) {
                popup.classList.remove("animated", "fadeIn");
                popup.style.display = "none";
                document.querySelector("body").style.overflow = "";
            }
        });
    }

    function showTimeModal(modal, time) {
        setTimeout(function() {
            document.querySelector(modal).style.display = "block",
            document.body.style.overflow = "hidden";
        }, time)
    }

    function install() {
        modalShow(".popup_engineer_btn", ".popup_engineer", ".popup_close");
        modalShow(".phone_link", ".popup", ".popup_close");
        // showTimeModal(".popup_engineer", 60000);
    }
    install();
}