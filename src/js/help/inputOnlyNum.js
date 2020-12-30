export default function inputOnlyNum(selector) {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener("input", e => {
            item.value =  item.value.replace(/\D/ig, "");
        });
    });
}