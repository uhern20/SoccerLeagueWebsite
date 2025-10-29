// scripts/admin.js
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const playersTable = document.getElementById("players-table").querySelector("tbody");

// Protect the page
if (localStorage.getItem("isAdmin") !== "true") {
  alert("Access denied. Admins only.");
  window.location.href = "login.html";
}

async function loadPlayers() {
  try {
    const q = query(collection(db, "players"), orderBy("birthYear"));
    const snapshot = await getDocs(q);

    playersTable.innerHTML = "";

    snapshot.forEach((doc) => {
      const player = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${player.name}</td>
        <td>${player.birthYear}</td>
        <td>${player.team}</td>
        <td>${player.email ?? "N/A"}</td>
      `;
      playersTable.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading players:", err);
    playersTable.innerHTML = "<tr><td colspan='4'>Error loading players.</td></tr>";
  }
}

loadPlayers();
