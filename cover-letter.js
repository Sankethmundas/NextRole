const fullName = document.querySelector("#full-name");
const jobTitle = document.querySelector("#job-title");
const companyName = document.querySelector("#company-name");
const hiringManager = document.querySelector("#hiring-manager");
const skills = document.querySelector("#skills");
const experience = document.querySelector("#experience");
const generateBtn = document.querySelector("#generate-cover-letter");
const output = document.querySelector("#cover-letter-output");
const copyBtn = document.querySelector("#copy-cover-letter");
const downloadBtn = document.querySelector("#download-cover-letter");
const template = document.querySelector("#cover-template");

window.addEventListener(
    "DOMContentLoaded",
    () => {
        fullName.value = localStorage.getItem("#name") || "";
        skills.value = localStorage.getItem("#skills") || "";
        experience.value = localStorage.getItem("#experience") || "";
        const savedLetter =
            localStorage.getItem(
            "lastCoverLetter"
        );

        if(savedLetter){
            output.innerHTML =
            savedLetter;
        }
        console.log(localStorage.getItem("#experience"));

    }
);

generateBtn.addEventListener(
    "click",
    () => {
        
        
        const selectedTemplate = template.value;
        if(
            fullName.value.trim() === "" ||
            jobTitle.value.trim() === "" ||
            companyName.value.trim() === ""
        ){
            alert(
                "Please fill all required fields."
            );
            return;
        }
        const manager = hiringManager.value.trim() || "Hiring Manager";

        if(selectedTemplate === "standard"){
            output.innerHTML = `
                <p>
                    Dear ${manager},
                </p>

                <p>
                    I am excited to apply for the ${jobTitle.value} position at
                    ${companyName.value}.
                </p>

                <p>
                    With experience in ${experience.value}, and skills including
                    ${skills.value},
                    I believe I can contribute
                    effectively to your team.
                </p>

                <p>
                    I am eager to bring my
                    technical skills, problem-solving
                    ability, and enthusiasm to
                    ${companyName.value}.
                </p>

                <p>
                    Thank you for your time and
                    consideration.
                </p>

                <p class="signature">
                    Sincerely,
                </p>

                <p class="signature-name">
                    ${fullName.value}
                </p>
                `;
        }

        else if(selectedTemplate === "startup"){
            output.innerHTML = `
                <p>Dear ${manager},</p>

                <p>
                    I am excited about the opportunity
                    to join ${companyName.value}
                    as a ${jobTitle.value}.
                </p>

                <p>
                    My background in
                    ${experience.value}
                    and experience with
                    ${skills.value}
                    have prepared me to thrive
                    in fast-paced environments.
                </p>

                <p>
                    I enjoy building products,
                    solving challenging problems,
                    and collaborating with teams.
                </p>

                <p>
                    I would welcome the opportunity
                    to contribute to
                    ${companyName.value}.
                </p>

                <p class="signature">
                    Best Regards,
                </p>

                <p class="signature-name">
                    ${fullName.value}
                </p>
            `;
        }

        else{
            output.innerHTML = `
                <p>Dear ${manager},</p>

                <p>
                    I am writing to express my
                    interest in the
                    ${jobTitle.value}
                    position at
                    ${companyName.value}.
                </p>

                <p>
                    My experience in
                    ${experience.value}
                    combined with expertise in
                    ${skills.value}
                    enables me to deliver
                    high-quality results.
                </p>

                <p>
                    I am confident my skills and
                    professionalism would make
                    me a valuable addition to
                    your organization.
                </p>

                <p>
                    Thank you for considering
                    my application.
                </p>

                <p class="signature">
                    Respectfully,
                </p>

                <p class="signature-name">
                    ${fullName.value}
                </p>
            `;
        }

        localStorage.setItem("lastCoverLetter",output.innerHTML);
       
    }
);

copyBtn.addEventListener(
    "click",
    () => {
        navigator.clipboard.writeText(output.innerText);
        copyBtn.textContent = "✓ Copied";
        setTimeout(
            () => {
                copyBtn.textContent = "📋 Copy";
            },
            2000
        );

    }
);

downloadBtn.addEventListener("click", () => {

    output.classList.add("pdf-export");

    const options = {
        margin:0.5,
        filename:"cover-letter.pdf",

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{
            scale:2,
            backgroundColor:"#ffffff"
        },

        jsPDF:{
            unit:"in",
            format:"letter",
            orientation:"portrait"
        }
    };

    html2pdf()
        .set(options)
        .from(output)
        .save()
        .then(() => {

            output.classList.remove("pdf-export");

        });

});