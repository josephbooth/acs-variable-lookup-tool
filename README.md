# ACS API Variable Lookup  

## Overview  
**ACS API Variable Lookup** is a tool designed to help users efficiently search for and understand variable names used in the **American Community Survey (ACS)** dataset, which powers [data.census.gov](https://data.census.gov).  

The tool allows users to:  
- **Input an ACS API Endpoint** to retrieve Census data.  
- **Search for specific values** within the dataset and determine their corresponding variable names.  
- **View metadata** such as variable labels, concepts, and associated attributes.  
- **Explore related API variables** through clickable links that provide direct access to Census API responses.  
- **Decode and display geographic information** based on `ucgid` identifiers.  

This project provides a **simple, no-install, web-based** solution that runs in a browser using **HTML, CSS, and JavaScript** without requiring additional dependencies.  

---

## **Why This Tool Exists**  
Finding the right **variable names** in Census API responses is **not straightforward** when working with **data.census.gov**.  

The Census API provides thousands of variable names such as `S1903_C01_004E`, but these names are **not always meaningful** without additional metadata.  

This tool helps users:  
1. **Quickly determine which variable names correspond to search values** within ACS datasets.  
2. **Retrieve metadata such as descriptions and concepts** to make sense of the variables.  
3. **Explore related variables** through dynamically generated API links.  
4. **Decode `ucgid` identifiers** to extract detailed geographic information (state, county, tract, block, etc.).  

---

## **Use Cases**  
### ✅ **Researchers & Data Analysts**  
- Need to **find variable names** when working with Census API datasets.  
- Want to **understand what each variable represents** before using it in analysis.  
- Need an **efficient way to navigate ACS metadata** without manually searching documentation.  

### ✅ **Developers & GIS Specialists**  
- Automating Census API queries and **need precise variable names**.  
- **Integrating Census data** into applications and require structured metadata.  
- **Decoding geography identifiers (`ucgid`)** to associate Census data with location-based insights.  

### ✅ **Journalists & Policy Experts**  
- Investigating Census data trends and **need context for each variable**.  
- Looking for an **easy-to-use tool** that does not require programming skills.  

---

## **How It Works**  
### **1️⃣ Input an API Endpoint**  
Users paste an ACS API URL (e.g., `https://api.census.gov/data/2023/acs/acs5/subject?get=group(S1903)&ucgid=0500000US01051`) into the **API Endpoint** field.  

### **2️⃣ Enter a Search Value**  
Users provide a **numeric value** (e.g., `"541"`) to find which variable name contains that value.  

### **3️⃣ View Results**  
The tool retrieves the API response and displays:  
- **Matched variable names**  
- **Metadata (label, concept, attributes)**  
- **Clickable API links** for each variable  

### **4️⃣ Explore Attributes & Related Variables**  
- The tool **extracts and links related attributes**, making exploration easier.  

### **5️⃣ Decode `ucgid` Geography Codes**  
- If the API contains a `ucgid` (e.g., `"0500000US01051"`), the tool **decodes it into readable geographic components** (state, county, tract, etc.).  

---

## **Installation & Setup**  
This project is **100% browser-based** and does **not** require installation.  

### **Option 1: Run Locally**
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
2. **Open `api-variable-lookup.html` in a browser** (Chrome, Firefox, Edge, Safari).  
   - No dependencies or server required!  

### **Option 2: Run from GitHub Pages**
If hosted via **GitHub Pages**, users can access the tool directly in a browser.  

---

## **Project Structure**  
The project is structured as a **simple front-end web tool** using:  

📄 **`api-variable-lookup.html`**  
- The main UI with input fields, search results, and dynamic output sections.  

🎨 **`api-variable-lookup-styles.css`**  
- Styles for form layout, buttons, and output formatting.  

⚙️ **`api-variable-lookup-functionality.js`**  
- Handles API calls, variable matching, metadata fetching, and `ucgid` decoding.  

---

## **Technical Details**  

### **ACS API Query Structure**  
The tool interacts with **ACS datasets** available at:
- **Example API Call:**  
  ```sh
  https://api.census.gov/data/2023/acs/acs5/subject?get=group(S1903)&ucgid=0500000US01051

The API response contains **header** and **data rows**, where the tool matches search values.  

### **Variable Metadata Extraction**  
Once a variable is identified, a **secondary API request** fetches metadata:  

Example API Request:  
`https://api.census.gov/data/2023/acs/acs5/subject/variables/S1903_C01_004E.json`  

This request returns details about the variable, including:  
- **Label:** `"Estimate!!Number!!HOUSEHOLD INCOME BY AGE OF HOUSEHOLDER!!25 to 44 years"`  
- **Concept:** `"Median Income in the Past 12 Months (in 2023 Inflation-Adjusted Dollars)"`  
- **Attributes:** Additional variables that describe margin of error, annotations, and more.  

---

### **Geography (`ucgid`) Decoding**  
The tool extracts components from `ucgid` values, allowing users to understand which regions Census data applies to.  

Example Decoded `ucgid`:  
- `0500000US01051` → **county: 051, state: 01**  
- `1400000US13089020600` → **tract: 020600, county: 089, state: 13**  

---

## **Contributing**  
Contributions are welcome!  

1. **Fork the repository**  
2. **Make improvements** (bug fixes, feature updates)  
3. **Submit a pull request**  

For feature requests or bug reports, open a **GitHub Issue**.  

---

## **License**  
This project is licensed under the **MIT License**, meaning:  
- You can **modify and use the code freely**.  
- Attribution is **appreciated** but not required.  
