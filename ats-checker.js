const checkBtn = document.querySelector("#check-ats-btn");
const resumeText = document.querySelector("#resume-text");
const atsScore = document.querySelector("#ats-score");
const matchedSkills = document.querySelector("#matched-keywords");
const missingSkills = document.querySelector("#missing-keywords");
const jobDescription = document.querySelector("#job-description");
const resumeChecks = document.querySelector("#resume-checks");
const resumeFile = document.querySelector("#resume-file");
const completenessScore = document.querySelector("#completeness-score");
const resumeTechStack = document.querySelector("#resume-tech-stack");
const skillGap = document.querySelector("#skill-gap");
const atsSuggestions = document.querySelector("#ats-suggestions");
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


const techStack = [
    "java",
    "python",
    "sql",
    "html",
    "css",
    "javascript",
    "react",
    "node",
    "express",
    "mongodb",
    "spring",
    "spring boot",
    "hibernate",
    "git",
    "github",
    "aws",
    "docker",
    "kubernetes",
    "rest api",
    "mysql",
    "oracle",
    "power bi",
    "excel",
    "tableau",
    "machine learning",
    "tensorflow",
    "pandas",
    "numpy"

];

resumeFile.addEventListener(
    "change",
    (event) => {

        const file = event.target.files[0];

        if(!file){
            return;
        }

        if(file.type === "application/pdf"){
            const reader = new FileReader();
            reader.onload = async function(){
                try{
                    const typedArray = new Uint8Array(reader.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    let pdfText = "";
                    for(
                        let pageNum = 1;
                        pageNum <= pdf.numPages;
                        pageNum++
                    ){
                        const page = await pdf.getPage(pageNum);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items
                                            .map(
                                                item => item.str
                                            ).join(" ");
                        pdfText += pageText + "\n" ;
                    }
                    resumeText.value = pdfText; 
                }
                catch(error){
                    console.error(error);
                    alert("Unable to read PDF");
                }
            };
            reader.readAsArrayBuffer(file);     
        }
        else{
            const reader = new FileReader();
            reader.onload = (e) => {
                resumeText.value = e.target.result;
            }
            reader.readAsText(file);
        }
    }
);

checkBtn.addEventListener("click", () => {
    const resume = resumeText.value.toLowerCase();
    const jd = jobDescription.value.toLowerCase();

    if(jd.trim() === ""){
        alert("Please paste a Job Description first.");
        return;
    }

    const requiredSkills = [];
    const matchedSkillsList = [];
    const missingSkillsList = [];
    const checks = [];
    const detectedTech = [];
    const suggestions = [];
    techStack.forEach((tech) => {
        if(resume.includes(tech)){
            detectedTech.push(tech);
        }
    });

    const emailPattern = /\S+@\S+\.\S+/;
    if(emailPattern.test(resume)){
        checks.push("✓ Email Found");
    }
    else{
        checks.push("✗ Email Missing");
        suggestions.push("Add a valid Email ID.");
    }

    if(/\d{10}/.test(resume)){
        checks.push("✓ Phone Found");
    }else{
        checks.push("✗ Phone Missing");
    }

    if(!resume.includes("phone")){
        suggestions.push("Add your Contact Number.");
    }

    if(resume.includes("linkedin")){
        checks.push("✓ LinkedIn Found");
    }else{
        checks.push("✗ LinkedIn Missing");
    }

    if(!resume.includes("linkedin")){
        suggestions.push("Add your Linkedin Profile .");
    }

    if(resume.includes("github")){
        checks.push("✓ GitHub Found");
    }else{
        checks.push("✗ GitHub Missing");
    }

    if(!resume.includes("github")){
        suggestions.push("Add your GitHub Profile.");
    }

    if(resume.includes("skills")){
        checks.push("✓ Skills Section Found");
    }else{
        checks.push("✗ Skills Section Missing");
    }

    if(!resume.includes("skills")){
        suggestions.push("Add your Skills in the Skills section.");
    }

    if(resume.includes("projects")){
        checks.push("✓ Projects Section Found");
    }else{
        checks.push("✗ Projects Section Missing");
    }

    if(!resume.includes("projects")){
        suggestions.push("Add Projects to showcase your practical Skills.");
    }

    if(resume.includes("education")){
        checks.push("✓ Education Section Found");
    }else{
        checks.push("✗ Education Section Missing");
    }

    if(!resume.includes("education")){
        suggestions.push("Add your Education please.");
    }

    if(resume.includes("certifications")){
        checks.push("✓ Certifications Section Found");
    }else{
        checks.push("✗ Certifications Section Missing");
    }

    if(!resume.includes("certifications")){
        suggestions.push("Add relevant Certifications.");
    }

    if(resume.includes("experience")){
        checks.push("✓ Experience Section Found");
    }else{
        checks.push("✗ Experience Section Missing");
    }

    if(!resume.includes("experience")){
        suggestions.push("Add a Professional experience.");
    }

    resumeChecks.innerHTML = "";

    checks.forEach((check) => {
        const li = document.createElement("li");
        li.textContent = check;
        if(check.includes("✓")){
            li.classList.add("check-pass");
        }else{
            li.classList.add("check-fail");
        }
        resumeChecks.appendChild(li);

    });

    const passedChecks =
        checks.filter(
            (check) => check.includes("✓")).length;

    const completeness =
        Math.round(
            (passedChecks / checks.length) * 100
        );

    completenessScore.textContent =
    `Resume Completeness: ${completeness}%`;

    resumeTechStack.innerHTML = "";
    detectedTech.forEach((tech) => {
        const li = document.createElement("li");
        li.textContent = tech;
        resumeTechStack.appendChild(li);
    });

    techStack.forEach((tech) => {
        if(jd.includes(tech)){
            requiredSkills.push(tech);
        }
    });
    requiredSkills.forEach((tech) => {
        if(resume.includes(tech)){
            matchedSkillsList.push(tech);
        }else{
            missingSkillsList.push(tech);
        }
    });

    const score = requiredSkills.length === 0
    ? 0 
    : Math.round(
        (matchedSkillsList.length /
        requiredSkills.length) * 100
    );

    atsScore.textContent =
    `${score}%`;

    const matchedCount = matchedSkillsList.length;
    const totalRequired = requiredSkills.length;

    skillGap.innerHTML =
    ` <p>Matched ${matchedCount} out of ${totalRequired} required skills </p> `;

    if(score >= 80){
        skillGap.innerHTML +=
            `   <p>
                    Excellent match for this role.
                </p>
            `;

    }
    else if(score >= 60){
        skillGap.innerHTML +=
            `   <p>
                    Good match.
                    Consider adding missing skills.
                </p>
            `;
    }
    else{
        skillGap.innerHTML +=
            `   <p>
                    Significant skill gaps detected.
                </p>
            `;
    }

    atsScore.classList.remove(
        "score-low",
        "score-medium",
        "score-high"
    );

    if(score < 40){
        atsScore.classList.add("score-low");
    }
    else if(score < 70){
        atsScore.classList.add("score-medium");
    }
    else{
        atsScore.classList.add("score-high");
    }
    matchedSkills.innerHTML = "";
    missingSkills.innerHTML = "";

    matchedSkillsList.forEach((keyword) => {
        const li = document.createElement("li");
        li.textContent = keyword;
        matchedSkills.appendChild(li);
    });

    missingSkillsList.forEach((keyword) => {
        const li = document.createElement("li");
        li.textContent = keyword;
        missingSkills.appendChild(li);

        suggestions.push(`Add ${keyword} to your skills or projects section.`);
    });

    atsSuggestions.innerHTML = "";
    suggestions.forEach((suggestion) => {
        const li = document.createElement("li");
        li.textContent = suggestion;
        atsSuggestions.appendChild(li);
    });

});