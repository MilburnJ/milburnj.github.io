function showProjects() {
    document.getElementById("projects-section").style.display = "block";
    document.getElementById("about-section").style.display = "none";

    document.getElementById("projects-tab").classList.add("active");
    document.getElementById("about-tab").classList.remove("active");
}

function showAbout() {
    document.getElementById("projects-section").style.display = "none";
    document.getElementById("about-section").style.display = "block";

    document.getElementById("about-tab").classList.add("active");
    document.getElementById("projects-tab").classList.remove("active");
}

// Set default view
document.addEventListener("DOMContentLoaded", showProjects);
