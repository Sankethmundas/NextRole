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

    const skillsArray = savedSkills.split(",");
    previewSkills.innerHTML =
        skillsArray
            .map(
                skill => `<li>${skill.trim()}</li>`
            )
            .join("");

}

skillsInput.addEventListener(
    "input",
    () => {
        const skillsArray = skillsInput.value.split(",");
        previewSkills.innerHTML =
            skillsArray
                .map(
                    skill =>
                        `<span class="skill-tag">
                            ${skill.trim()}
                        </span>`
                )
                .join("");

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


const downloadBtn = document.querySelector("#download-btn");
const resumePreview = document.querySelector(".resume-preview");
downloadBtn.addEventListener(
    "click",
    () => {
        const options = {
            margin: 0.5,
            filename: "resume.pdf",
            image: {
                type: "jpeg",
                quality: 1
            },
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                unit: "in",
                format: "letter",
                orientation: "portrait"
            }
        };

        html2pdf()
            .set(options)
            .from(resumePreview)
            .save()
            .then(() => {
                downloadBtn.style.display =
                    "block";
            });

        downloadBtn.style.display = "none";
    }
);