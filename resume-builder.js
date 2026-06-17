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
    else{
        preview.textContent = preview.dataset.placeholder || "";
    }

    input.addEventListener("input", () => {
        preview.textContent =
            input.value ||
            preview.dataset.placeholder ||
            "";

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
    "#summary",
    "#preview-summary"
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
    "#experience",
    "#preview-experience"
);

connectField(
    "#certifications",
    "#preview-certifications"
);

const projectLinkInput = document.querySelector("#project-link");
const previewProjectLink = document.querySelector("#preview-project-link");

projectLinkInput.addEventListener(
    "input",
    () => {
        previewProjectLink.href = projectLinkInput.value;
        previewProjectLink.textContent = projectLinkInput.value;
        localStorage.setItem(
            "#project-link",
            projectLinkInput.value
        );
    }
);

const projectDescriptionInput = document.querySelector("#project-description");
const previewProjectDescription = document.querySelector("#preview-project-description");
projectDescriptionInput.addEventListener(
    "input",
    () => {
        previewProjectDescription.textContent =
            projectDescriptionInput.value ||
            "Add your project description";
    }
);
const skillsInput = document.querySelector("#skills");
const previewSkills = document.querySelector("#preview-skills");

const savedSkills = localStorage.getItem("#skills");

if(savedSkills){
    skillsInput.value = savedSkills;
    const skillsArray = savedSkills.split(",").map(s => s.trim()).filter(s => s);
    previewSkills.innerHTML =
        skillsArray
            .map(
                skill =>
                    `<span class="skill-tag">${skill}</span>`
            )
            .join(", ");
}

skillsInput.addEventListener(
    "input",
    () => {
        const skillsArray = skillsInput.value.split(",").map(s => s.trim()).filter(s => s);
        previewSkills.innerHTML =
            skillsArray
                .map(
                    skill =>
                        `<span class="skill-tag">${skill}</span>`
                )
                .join(", ");

        localStorage.setItem(
            "#skills",
            skillsInput.value
        );
    }
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

const resumeContent = document.querySelector("#resume-content");
const downloadBtn = document.querySelector("#download-btn");
const resumePreview = document.querySelector(".resume-preview");
downloadBtn.addEventListener("click", () => {

    const resumeContent =
        document.querySelector("#resume-content");

    // Temporarily remove dark mode so CSS variables resolve to light values
    const body = document.body;
    const wasDarkMode = body.classList.contains("dark-mode");
    if (wasDarkMode) {
        body.classList.remove("dark-mode");
    }

    resumeContent.classList.add("pdf-export");

    downloadBtn.style.display = "none";

    const templateSelector =
        document.querySelector(".template-selector");

    if(templateSelector){
        templateSelector.style.display = "none";
    }

    const options = {

        margin: 0.3,

        filename: "resume.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
            logging: false
        },

        pagebreak: {
            mode: ["avoid-all", "css", "legacy"]
        },

        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }
    };

    // Wait for CSS repaint before capturing
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            html2pdf()
                .set(options)
                .from(resumeContent)
                .save()
                .then(() => {

                    resumeContent.classList.remove("pdf-export");

                    downloadBtn.style.display = "block";

                    if(templateSelector){
                        templateSelector.style.display = "flex";
                    }

                    // Restore dark mode if it was active
                    if (wasDarkMode) {
                        body.classList.add("dark-mode");
                    }

                });
        });
    });

});
const templateButtons = document.querySelectorAll(".template-btn");

templateButtons.forEach((button) => {
    button.addEventListener(
        "click",
        () => {
            const template = button.dataset.template;
            templateButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            resumePreview.classList.remove(
                "modern-template",
                "professional-template",
                "minimal-template"
            );
            resumePreview.classList.add(
                `${template}-template`
            );
        }
    );
});