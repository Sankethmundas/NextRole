const checkBtn = document.querySelector("#check-ats-btn");
const resumeText = document.querySelector("#resume-text");
const atsScore = document.querySelector("#ats-score");
const matchedKeywords = document.querySelector("#matched-keywords");
const missingKeywords = document.querySelector("#missing-keywords");
const jobDescription = document.querySelector("#job-description");
const resumeChecks = document.querySelector("#resume-checks");

const keywords = [
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

checkBtn.addEventListener("click", () => {
    const resume = resumeText.value.toLowerCase();
    const jd = jobDescription.value.toLowerCase();

    const requiredKeywords = [];
    const matched = [];
    const missing = [];
    const checks = [];

    if(
        resume.includes("@")
    ){
        checks.push(
            "✓ Email Found"
        );
    }else{
        checks.push(
            "✗ Email Missing"
        );
    }

    if(
        /\d{10}/.test(resume)
    ){
        checks.push(
            "✓ Phone Found"
        );
    }else{
        checks.push(
            "✗ Phone Missing"
        );
    }

    if(
        resume.includes("linkedin")
    ){
        checks.push(
            "✓ LinkedIn Found"
        );
    }else{
        checks.push(
            "✗ LinkedIn Missing"
        );
    }

    if(
        resume.includes("github")
    ){
        checks.push(
            "✓ GitHub Found"
        );
    }else{
        checks.push(
            "✗ GitHub Missing"
        );
    }

    if(
        resume.includes("project")
    ){
        checks.push(
            "✓ Projects Found"
        );
    }else{
        checks.push(
            "✗ Projects Missing"
        );
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




    keywords.forEach((keyword) => {
        if(jd.includes(keyword)){
            requiredKeywords.push(keyword);
        }
    });
    requiredKeywords.forEach((keyword) => {
        if(resume.includes(keyword)){
            matched.push(keyword);
        }else{
            missing.push(keyword);
        }
    });

    const score = requiredKeywords.length === 0
    ? 0 
    : Math.round(
        (matched.length /
        requiredKeywords.length) * 100
    );

    atsScore.textContent =
    `${score}%`;

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

    matchedKeywords.innerHTML = "";
    missingKeywords.innerHTML = "";

    matched.forEach((keyword) => {
        const li = document.createElement("li");
        li.textContent = keyword;
        matchedKeywords.appendChild(li);
    });

    missing.forEach((keyword) => {
        const li = document.createElement("li");
        li.textContent = keyword;
        missingKeywords.appendChild(li);
    });

});