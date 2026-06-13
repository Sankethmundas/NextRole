const companyInput = document.querySelector("#company");
const roleInput = document.querySelector("#role");
const statusInput = document.querySelector("#status");
const addJobBtn = document.querySelector("#add-job-btn");
const jobTableBody = document.querySelector("#job-table-body");
const searchInput = document.querySelector("#search-job");
const statusFilter = document.querySelector("#status-filter");
const totalCount = document.querySelector("#total-count");
const appliedCount = document.querySelector("#applied-count");
const interviewCount = document.querySelector("#interview-count");
const offerCount = document.querySelector("#offer-count");
const exportBtn = document.querySelector("#export-btn");


const jobs = JSON.parse(
    localStorage.getItem("jobs")
) || [];


let editIndex = -1;

function renderJobs(searchText = "", selectedStatus = "all" ){
    jobTableBody.innerHTML = "";
    const filteredJobs = jobs.filter((job) => {

        const matchesSearch = 
            job.company
                .toLowerCase()
                .includes(
                    searchText.toLowerCase()
                );

        const matchesStatus = 
            selectedStatus === "all" ||
            job.status === selectedStatus;

        return (
            matchesSearch && matchesStatus
        );
    });

    if(filteredJobs.length === 0){

        jobTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    No matching jobs found
                </td>
            </tr>
        `;

        return;
    }

    filteredJobs.forEach((job, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${job.company}</td>
            <td>${job.role}</td>
            <td>
                <span class="status-badge ${job.status.toLowerCase()}">
                    ${job.status}
                </span>
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editJob(${index})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteJob(${index})"
                >
                    Delete
                </button>
            </td>

        `;

        jobTableBody.appendChild(row);
    });
}

function updateStats(){

    totalCount.textContent = jobs.length;
    
    appliedCount.textContent = jobs.filter(
        job => job.status === "Applied"
    ).length;

    interviewCount.textContent = jobs.filter(
        job => job.status === "Interview"
    ).length;

    offerCount.textContent = jobs.filter(
        job => job.status === "Offer"
    ).length;
}

function deleteJob(index){
    jobs.splice(index,1);
    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );
    renderJobs();
    updateStats();
}

function editJob(index){
    const job = jobs[index];
    companyInput.value = job.company;
    roleInput.value = job.role;
    statusInput.value = job.status;
    
    editIndex = index;
     
    addJobBtn.textContent = "Update Job";
}

addJobBtn.addEventListener("click", () => {

    if(
        companyInput.value.trim() === "" ||
        roleInput.value.trim() === ""
    ){
        alert("Please fill all the fields");
        return;
    }
    
    const newJob = {
        company: companyInput.value,
        role: roleInput.value,
        status: statusInput.value
    };

    if(editIndex === -1){
        jobs.push(newJob);
    }else{
        jobs[editIndex] = newJob
    }

    console.log(jobs);
    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );
    renderJobs();
    updateStats();

    editIndex = -1;
    addJobBtn.textContent = "Add Job";

    companyInput.value = "";
    roleInput.value = "";
    statusInput.value = "Applied";


});

searchInput.addEventListener("input", () => {

    renderJobs(
        searchInput.value,
        statusFilter.value
    );

});

statusFilter.addEventListener(
    "change",
    () => {

        renderJobs(
            searchInput.value,
            statusFilter.value
        );

    }
);

exportBtn.addEventListener("click", () => {
    let csv = "Company,Role,Status\n";

    jobs.forEach((job)  => {
        csv += 
            `${job.company},${job.role},${job.status}\n`;
    });

    const blob = new Blob(
        [csv],
        {type: "text/csv"}
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jobs.csv";
    a.click();


});

renderJobs();
updateStats();

