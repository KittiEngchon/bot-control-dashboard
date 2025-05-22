function saveTickSettings() {
  const token0 = document.getElementById("token0").value.trim();
  const token1 = document.getElementById("token1").value.trim();
  const tickLower = parseInt(document.getElementById("tickLower").value);
  const tickUpper = parseInt(document.getElementById("tickUpper").value);

  if (!token0 || !token1 || isNaN(tickLower) || isNaN(tickUpper)) {
    document.getElementById("status").innerText = "❌ Please fill all fields correctly.";
    return;
  }

  if (tickLower >= tickUpper) {
    document.getElementById("status").innerText = "❌ Tick Lower must be less than Tick Upper.";
    return;
  }

  const settings = {
    token0,
    token1,
    tickLower,
    tickUpper
  };

  localStorage.setItem("marketMakerTickSettings", JSON.stringify(settings));
  document.getElementById("status").innerText = "✅ Settings saved successfully!";
}
