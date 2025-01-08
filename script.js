document.addEventListener("DOMContentLoaded", () => {
  const tableauExtensionButton = document.getElementById("exportButton");

  tableauExtensionButton.addEventListener("click", async () => {
    try {
      console.log("Initializing Tableau Extensions API...");

      // Check if Tableau Extensions API is loaded
      if (typeof tableau === "undefined") {
        throw new Error("Tableau Extensions API is not loaded.");
      }

      // Initialize the Extensions API
      await tableau.extensions.initializeAsync();
      console.log("Tableau Extensions API initialized successfully.");

      // Get the dashboard and parameters
      const dashboard = tableau.extensions.dashboardContent.dashboard;
      const parameters = await dashboard.getParametersAsync();
      console.log("Fetched parameters:", parameters);

      let startDate = null;
      let endDate = null;

      // Loop through parameters to find "Start Date - Selector" & "End Date - Selector"
      for (let param of parameters) {
        console.log(`Parameter Name: ${param.name}, Value: ${param.currentValue.value}`);

        if (param.name === "Start Date - Selector") {
          startDate = param.currentValue.value;
        } else if (param.name === "End Date - Selector") {
          endDate = param.currentValue.value;
        }
      }

      // If either parameter is missing, alert the user
      if (!startDate || !endDate) {
        alert("Both 'Start Date - Selector' and 'End Date - Selector' parameters must be set in the dashboard.");
        return;
      }

      // Debug/alert the parameter values
      console.log(`Start Date: ${startDate}, End Date: ${endDate}`);
      alert(`Start Date: ${startDate}\nEnd Date: ${endDate}`);

    } catch (error) {
      console.error("Error during parameter export:", error);
      alert("An error occurred. Check the console for more details.");
    }
  });
});
