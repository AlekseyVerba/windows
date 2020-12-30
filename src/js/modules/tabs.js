export default function tabs() {
    function installTabs(wrapperSelector, tabSelector, contentSelector, activeClass) {
        const wrapper = document.querySelector(wrapperSelector),
              tab = wrapper.querySelectorAll(tabSelector),
              content = document.querySelectorAll(contentSelector);
        function hideAll() {
            tab.forEach(item => {
                if (item.classList.contains(activeClass)) {
                    item.classList.remove(activeClass);
                }
            });
            content.forEach(item => {
                item.classList.remove("animated" ,"fadeIn");
                item.style.display = "none";
            });
        }
        hideAll();
        function showAll(i = 0) {
            content[i].classList.add("animated" ,"fadeIn");
            content[i].style.display = "block";
            if (activeClass) {
                tab[i].classList.add(activeClass);
            }
        }
        showAll();
        tab.forEach((item, index) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                hideAll();
                showAll(index);
            });
        });
    }
    function install() {
        installTabs(".glazing_slider", ".glazing_block", ".glazing_content", "");
        installTabs(".decoration_slider", ".no_click", "[data-slide]", "after_click");
    }
    install();
}