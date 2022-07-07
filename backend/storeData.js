const hospitals = require("./hospital_RMD.json");
const Hospital = require("./models/hospital");
const physicians = require("./physicians_RMD.json");
const Physician = require("./models/physician");
const url = require("./image_url");

async function storeHospitalData(enabled = false) {
  if (enabled) {
    for (let hospital of hospitals.hospitals) {
      await Hospital.createHospitalData(hospital);
    }
    setTimeout(() => {
      console.info("LOADING HOSPITAL DATA...".bgGreen);
    }, 200);
    setTimeout(() => {
      console.info(`* Hospital Data imported successfully ✔️`.green);
    }, 1200);
    enabled = false;
  } else {
    console.info(`** ATTENTION **`.bgYellow);
    console.info(`*Function: "storeHospitalData()" enabled=false`.yellow);
  }
}
async function storePhysicianData(enabled = false) {
  if (enabled) {
    for (let physician of physicians.physicians) {
      if (
        physician["first_name"] &&
        physician["last_name"] &&
        physician["title"]
      ) {
        physician[
          "first_name"
        ] = `${physician["first_name"]} ${physician["last_name"]}, ${physician["title"]}`;
        physician["last_name"] = null;
        await Physician.createPhysicianData(physician);
      }
      if (
        physician["first_name"] &&
        !physician["last_name"] &&
        !physician["title"]
      ) {
        await Physician.createPhysicianData(physician);
      }
      if (!physician["image_url"]) {
        await Physician.updatePhysician(url, physician["first_name"]);
      }
    }
    setTimeout(() => {
      console.info(`LOADING PHYSICIAN DATA...`.bgGreen);
    }, 1200);
    setTimeout(() => {
      console.info(`* Physician Data imported successfully ✔️`.green);
      process.exit();
    }, 1500);
    enabled = false;
  } else {
    console.info(`**  ATTENTION  **`.bgYellow);
    console.info(`*Function: "storePhysicianData()" enabled=false`.yellow);
  }
}
for (let i = 0; i < process.argv.length; i++) {
  switch (process.argv[i]) {
    case "storeHospitalData":
      storeHospitalData(true);
      break;
    case "storePhysicianData":
      storePhysicianData(true);
      break;
  }
}
module.exports.storeHospitalData = storeHospitalData;
module.exports.storePhysicianData = storePhysicianData;
