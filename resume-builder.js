function connectField(inputId, previewId){

    const input = document.querySelector(inputId);
    const preview = document.querySelector(previewId);


    if(!input || !preview){
        console.error(
            "Missing:",
            inputId,
            previewId
        );
        return;
    }

    const savedValue = localStorage.getItem(inputId);
    if(savedValue){
        input.value = savedValue;
        preview.textContent = savedValue;
    }

    input.addEventListener("input", () => {
        preview.textContent = input.value;

        localStorage.setItem(inputId,input.value);
    });
}

    

connectField(
    "#name",
    "#preview-name"
);

connectField(
    "#email",
    "#preview-email"
);

connectField(
    "#phone",
    "#preview-phone"
);

connectField(
    "#skills",
    "#preview-skills"
);

connectField(
    "#linkedin",
    "#preview-linkedin"
);

connectField(
    "#github",
    "#preview-github"
);

connectField(
    "#address",
    "#preview-location"
);

connectField(
    "#education",
    "#preview-degree"
);

connectField(
    "#college",
    "#preview-college"
);

connectField(
    "#gpa",
    "#preview-cgpa"
);

connectField(
    "#project-title",
    "#preview-project-title"
);

connectField(
    "#project-description",
    "#preview-project-description"
);


connectField(
    "#project-link",
    "#preview-project-link"
);

connectField(
    "#experience",
    "#preview-experience"
);

connectField(
    "#certifications",
    "#preview-certifications"
);

const generateBtn = document.querySelector("#generate-btn");
const successMessage = document.querySelector("#success-message");

const name = document.querySelector("#name");
const email = document.querySelector("#email");

generateBtn.addEventListener("click", () => {
    if(name.value.trim() === ""){
        successMessage.textContent =
            "Please enter your name.";
        return;
    }
    if(email.value.trim() === ""){
        successMessage.textContent =
            "Please enter your email.";
        return;
    }
    successMessage.textContent = "✓ Resume Generated Successfully";
    setTimeout(() => {
        successMessage.textContent = "";
    }, 3000);
});

const clearBtn = document.querySelector("#clear-btn");

clearBtn.addEventListener("click", () => {
    const confirmClear = confirm("Are you sure you want to clear your resume?");
    if(confirmClear){
        localStorage.clear();
        location.reload();
    }
});