var token = "YOUR_JPDB_TOKEN";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";

function resetForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("rollNo").disabled = false;
    document.getElementById("rollNo").focus();

    disableFields();
    disableButtons();
}

function disableFields() {
    ["fullName","studentClass","birthDate","address","enrollDate"]
        .forEach(id => document.getElementById(id).disabled = true);
}

function enableFields() {
    ["fullName","studentClass","birthDate","address","enrollDate"]
        .forEach(id => document.getElementById(id).disabled = false);
}

function disableButtons() {
    saveBtn.disabled = true;
    updateBtn.disabled = true;
    resetBtn.disabled = true;
}

function checkRollNo() {
    let roll = rollNo.value;
    if (roll === "") return;

    let req = createGET_BY_KEYRequest(token, dbName, relName, roll);
    let res = executeCommandAtGivenBaseUrl(
        req, "http://api.login2explore.com:5577", "/api/irl"
    );

    enableFields();
    resetBtn.disabled = false;

    if (res.status === 200) {
        let data = JSON.parse(res.data).record;

        rollNo.disabled = true;
        updateBtn.disabled = false;

        fullName.value = data.fullName;
        studentClass.value = data.studentClass;
        birthDate.value = data.birthDate;
        address.value = data.address;
        enrollDate.value = data.enrollDate;
    } else {
        saveBtn.disabled = false;
    }

    fullName.focus();
}

function validate() {
    return fullName.value && studentClass.value &&
           birthDate.value && address.value &&
           enrollDate.value;
}

function saveData() {
    if (!validate()) {
        alert("All fields are mandatory!");
        return;
    }

    let jsonData = {
        rollNo: rollNo.value,
        fullName: fullName.value,
        studentClass: studentClass.value,
        birthDate: birthDate.value,
        address: address.value,
        enrollDate: enrollDate.value
    };

    let req = createPUTRequest(token, JSON.stringify(jsonData),
                              dbName, relName);

    executeCommandAtGivenBaseUrl(
        req, "http://api.login2explore.com:5577", "/api/iml"
    );

    resetForm();
}

function updateData() {
    if (!validate()) {
        alert("All fields are mandatory!");
        return;
    }

    let jsonData = {
        fullName: fullName.value,
        studentClass: studentClass.value,
        birthDate: birthDate.value,
        address: address.value,
        enrollDate: enrollDate.value
    };

    let req = createUPDATERecordRequest(
        token, JSON.stringify(jsonData),
        dbName, relName, rollNo.value
    );

    executeCommandAtGivenBaseUrl(
        req, "http://api.login2explore.com:5577", "/api/iml"
    );

    resetForm();
}
