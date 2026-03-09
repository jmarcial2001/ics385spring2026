// AI helped to write me this code. I used the following prompt:
// "Write a config.js file for a Node.js Express server that manages environment variables for API keys. 
// The file should include a class called SecureConfig with a method to validate that all required environment variables are set, and a method to retrieve these variables safely. 
// The required environment variables are OPENWEATHER_API_KEY, RAPIDAPI_KEY, and RAPIDAPI_HOST."


// Load environment variables from the .env file into process.env
// This allows sensitive credentials (API keys) to be stored securely
// outside of the main application code.
require("dotenv").config();


// SecureConfig class is responsible for managing and validating
// all environment-based configuration values used in the application.
// This helps keep API credentials secure and prevents hardcoding secrets.
class SecureConfig {


  // validateEnv() checks that all required environment variables exist
  // before the server attempts to use any APIs.
  // If a required variable is missing, it warns the developer and prevents errors later.
  static validateEnv() {

    // List of required environment variables for this dashboard
    const requiredVars = [
      "OPENWEATHER_API_KEY",
      "RAPIDAPI_KEY",
      "RAPIDAPI_HOST"
    ];

    // Filter out any variables that are missing or empty
    const missingVars = requiredVars.filter(
      (variable) => !process.env[variable] || process.env[variable].trim() === ""
    );

    // If any required variables are missing, log them for debugging
    if (missingVars.length > 0) {
      console.log("Missing environment variables:");
      missingVars.forEach((variable) => console.log(`- ${variable}`));

      // Return false so the server knows configuration is incomplete
      return false;
    }

    // All required variables exist
    return true;
  }

  // get() is a helper method used to safely retrieve
  // environment variables throughout the application.
  // This prevents direct access to process.env across multiple files.
  static get(key) {
    return process.env[key];
  }
}

// Export the SecureConfig class so it can be used in server.js
module.exports = SecureConfig;