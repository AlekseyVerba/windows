import inputOnlyNum from "../help/inputOnlyNum";


export default function forms() {
    const forms = document.querySelectorAll("form"),
          inputs = document.querySelectorAll("input");
    const message = {
        load: "Загрузка...",
        fail: "Ошбика. Повторите ещё раз",
        good: "Успешно",
        goodImg: "assets/img/ok.png",
        faleimg: "assets/img/no.png",
    };

    inputOnlyNum('[name="user_phone"]');

    forms.forEach(form => {
        form.addEventListener(`submit`, (e) => {
            e.preventDefault();
            document.querySelectorAll("[data-modal]").forEach(item => {
                item.style.display = "none";
                document.querySelector("body").style.overflow = "";
            });
            const glavaModal = form.closest("[data-modal]");
            console.log(glavaModal);
            glavaModal.style.display = "block";
            glavaModal.querySelector(".popup_dialog").style.display = "none";
            const wrapperMessage = document.createElement("div");
            wrapperMessage.classList.add("popup_dialog");
            glavaModal.append(wrapperMessage);
            const formData = new FormData(form);
            fetch("assets/server.php", {
                method: "POST",
                body: formData
            })
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    wrapperMessage.parentElement.classList.add("animated", "fadeIn");
                    // wrapperMessage.nextElementSibling.classList.add("status");
                    document.querySelector("body").style.overflow = "hidden";
                    wrapperMessage.parentElement.style.display = "block";
                    wrapperMessage.classList.add("message-good");
                    wrapperMessage.innerHTML = `
                        <div class="popup_content text-center status">
                            <button type="button" class="popup_close" data-close data-dinamika><strong>&times;</strong></button>
                                <h3>${message.good}</h3>
                                <img src="${message.goodImg}" alt="good" class="good-img"/>
                        </div>
                    `;
                }).catch(() => {
                    console.log(wrapperMessage);
                    wrapperMessage.parentElement.classList.add("animated", "fadeIn");
                    document.querySelector("body").style.overflow = "hidden";
                    wrapperMessage.parentElement.style.display = "block";
                    wrapperMessage.classList.add("message-fail");
                    wrapperMessage.innerHTML = `
                        <div class="popup_content text-center status">
                            <button type="button" class="popup_calc_end_close" data-close data-dinamika><strong>&times;</strong></button>
                                <h3>${message.fail}</h3>
                                <img src="${message.faleimg}" alt="fale"/>
                        </div>
                    `;
                }).finally(() => {
                    inputs.forEach(input => {
                        input.value = "";
                    });
                    setTimeout(() => {
                        wrapperMessage.parentElement.classList.remove("animated", "fadeOut","fadeIn");
                        wrapperMessage.parentElement.style.display = "none";
                        wrapperMessage.remove();
                        document.body.style.overflow = "";
                        glavaModal.querySelector(".popup_dialog").style.display = "block";
                    }, 5000);
                });
        })
    })
}


