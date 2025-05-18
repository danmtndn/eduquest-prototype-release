(() => {
  const raw = localStorage.getItem("player_data"); // Retrieve data from localStorage
  console.log("Raw localStorage data:", raw);

  if (!raw) {
      console.warn("❌ No data found in localStorage.");
      // Pass an empty payload directly to GameMaker
      if (typeof window.gml_Script_gmcallback_receiveCachedData === "function") {
          window.gml_Script_gmcallback_receiveCachedData("{\"id\":\"custom_event\",\"data\":null}");
      }
      return;
  }

  try {
      // Validate JSON structure
      JSON.parse(raw); // Ensure it's valid JSON
      console.log("Passing data to GameMaker via async_load:", raw);

      // Pass the data directly to GameMaker
      if (typeof window.gml_Script_gmcallback_receiveCachedData === "function") {
          window.gml_Script_gmcallback_receiveCachedData(
              JSON.stringify({ id: "custom_event", data: raw })
          );
      } else {
          console.warn("❌ Function gml_Script_gmcallback_receiveCachedData is not defined.");
      }
  } catch (error) {
      console.error("❌ Invalid JSON in localStorage:", error);
      // Pass an error payload directly to GameMaker
      if (typeof window.gml_Script_gmcallback_receiveCachedData === "function") {
          window.gml_Script_gmcallback_receiveCachedData("{\"id\":\"custom_event\",\"data\":null}");
      }
  }
})();