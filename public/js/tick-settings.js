function saveTickSettings() {
  const token0 = document.getElementById("token0").value.trim();
  const token1 = document.getElementById("token1").value.trim();
  const tickLower = parseInt(document.getElementById("tickLower").value);
  const tickUpper = parseInt(document.getElementById("tickUpper").value);
  const statusEl = document.getElementById("status");

  // Reset classes
  statusEl.classList.remove("text-green-400", "text-red-400");

  // Validate input
  if (!token0 || !token1 || isNaN(tickLower) || isNaN(tickUpper)) {
    statusEl.innerText = "❌ Please fill in all fields correctly.";
    statusEl.classList.add("text-red-400");
    return;
  }

  if (tickLower >= tickUpper) {
    statusEl.innerText = "❌ Tick Lower must be less than Tick Upper.";
    statusEl.classList.add("text-red-400");
    return;
  }

  // Save settings
  const settings = {
    token0,
    token1,
    tickLower,
    tickUpper,
    savedAt: new Date().toISOString()
  };

  localStorage.setItem("marketMakerTickSettings", JSON.stringify(settings));
  statusEl.innerText = "✅ Settings saved successfully!";
  statusEl.classList.add("text-green-400");
}
