export const setStatus = (status: boolean, statusTrigger: string) => {
    const trigger = document.getElementById(statusTrigger);
  
    if (trigger) {
      trigger.addEventListener("click", () => {
        status = !status;
        const sheet = document.getElementById("sheet");
        if (sheet) {
          sheet.classList.toggle("hidden", !status);  // Toggle the visibility of the Sheet
        }
      });
    }
  };
  