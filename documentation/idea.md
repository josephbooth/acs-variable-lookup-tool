# Project Summary

## Idea Overview

This software provides a user-friendly interface to interact with the U.S. Census API. It allows users to:

1. **Search for Specific Variables**: Users can input an API endpoint and a search value to locate specific variables within Census data. The software matches the search value against data rows and displays the corresponding header values (variables).

2. **View Metadata**: For each matching variable, the software retrieves detailed metadata, including the variable's label and concept, from the Census API. This information helps users understand the meaning and purpose of the variable.

3. **Click to Explore Data**: Variables are displayed as clickable hyperlinks. When clicked, they open a new tab showing the associated raw JSON data from the Census API, providing further context or allowing detailed analysis.

4. **Display Geography Name**: The software also retrieves and displays the name of the geographic area associated with the API query, providing clear context for the data being explored.

### Key Features
- Easy-to-use interface with input fields for API endpoint and search value.
- Dynamic fetching and display of variable metadata.
- Hyperlinked variables for quick access to raw JSON data.
- Geography name display for added clarity.
- Error handling and feedback for invalid inputs or failed API requests.

This tool is designed to streamline interactions with the Census API, making it easier for users to discover, explore, and analyze Census data with minimal effort.

