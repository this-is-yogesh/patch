const toggleSwitch = document.getElementById("toggleSwitch");

let isOn = false;
toggleSwitch.addEventListener("change", () => {
  isOn = toggleSwitch.checked;

  toggleSwitch.setAttribute("aria-checked", isOn);

  console.log("Switch is ON:", isOn);
});
