function nextStep(step) {
    updateProgress(step)
	let tabTrigger = document.querySelector(
		`button[data-bs-target="#step${step}"]`
	);

	let tab = new bootstrap.Tab(tabTrigger);
	tab.show();
}

function previousStep(step) {
    updateProgress(step)
	let tabTrigger = document.querySelector(
		`button[data-bs-target="#step${step}"]`
	);

	let tab = new bootstrap.Tab(tabTrigger);
	tab.show();
}

function submitForm() {
    showAlert("Successfull registration", "success")
}

function validateStep1(){
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value

    if(!name || !email){
        showAlert("Please field all fields", "danger")
    }
    return(name && email)
}

function showAlert(message, type) {
	let area = document.getElementById("alert-area");
	let alert = document.createElement("div");

	alert.className = "alert alert-" + type;
	alert.textContent = message;

	area.appendChild(alert);
	setTimeout(() => alert.remove(), 3000);
}

function updateProgress(step) {
	let progress = document.getElementById("wizardProgress");
	let percent = (step / 3) * 100;

	progress.style.width = percent + "%";
}