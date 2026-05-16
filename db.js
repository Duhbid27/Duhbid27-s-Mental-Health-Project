// --- DATABASE CONFIGURATION ---
// Paste your copied Google Web App URL here!
const API_URL = "https://script.google.com/macros/s/AKfycbxCnu63aI9ByNgpyk62H81DJ6BvCFFoe2p_ycLjybg5ESer9CQrXPv8nH574crl5oOPcw/exec"; 

export const DB = {
  // Read open letters
  async getOpenLetters(category = "all") {
    try {
      const response = await fetch(`${API_URL}?action=getOpenLetters&category=${category}`);
      return await response.json();
    } catch (error) {
      console.error("Error reading open letters:", error);
      return [];
    }
  },

  // Write open letter
  async postOpenLetter(category, content, authorName) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        redirect: "follow", // Essential for Google script redirects
        dataType: "json",
        body: JSON.stringify({
          action: "postOpenLetter",
          category,
          content,
          authorName
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Error posting open letter:", error);
      return { status: "error" };
    }
  },

  // Search named letters
  async searchNamedLetters(name) {
    try {
      const response = await fetch(`${API_URL}?action=searchNamedLetters&name=${encodeURIComponent(name)}`);
      return await response.json();
    } catch (error) {
      console.error("Error finding letters:", error);
      return [];
    }
  },

  // Write named letter
  async postNamedLetter(recipientName, content, authorName) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        redirect: "follow",
        dataType: "json",
        body: JSON.stringify({
          action: "postNamedLetter",
          recipientName,
          content,
          authorName
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Error posting named letter:", error);
      return { status: "error" };
    }
  }
};