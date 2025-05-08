document.getElementById('endpoint').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent form submission or other default behavior
        document.getElementById('fetchButton').click();  // Trigger button click
    }
});

document.getElementById('searchValue').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent form submission or other default behavior
        document.getElementById('fetchButton').click();  // Trigger button click
    }
});

document.getElementById('fetchButton').addEventListener('click', async () => {
    const endpoint = document.getElementById('endpoint').value;
    const searchValue = document.getElementById('searchValue').value;
    const outputDiv = document.getElementById('output');
    const geographyNameElement = document.getElementById('geography-name');
    geographyNameElement.textContent = "Geography Name: Not yet fetched"; // Reset geography name
    const resultContent = document.querySelectorAll('#output > div.header-box');
    resultContent.forEach(element => element.remove()); // Reset results

    if (!endpoint || !searchValue) {
        geographyNameElement.textContent = "Error: API endpoint and search value are required.";
        return;
    }

    try {
        // Fetch the initial data
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch the API data.");

        const data = await response.json();
        const headers = data[0];
        const dataRow = data[1];

        // Find the matching indices
        const matchingIndices = [];
        dataRow.forEach((value, index) => {
            if (value === searchValue) {
                matchingIndices.push(index);
            }
        });

        if (matchingIndices.length === 0) {
            geographyNameElement.textContent = "Error: Search value not found in data row.";
            return;
        }

        // Modify the endpoint to fetch geography name
        const ucgid = new URL(endpoint).searchParams.get('ucgid');
        const nameEndpoint = endpoint.replace(/\?.*/, `?get=NAME&ucgid=${encodeURIComponent(ucgid)}`);

        const nameResponse = await fetch(nameEndpoint);
        if (!nameResponse.ok) {
            throw new Error("Failed to fetch geography name.");
        }

        const nameJson = await nameResponse.json();
        const nameHeaders = nameJson[0]; // Header row from name API
        const nameDataRow = nameJson[1]; // Data row from name API
        const nameIndex = nameHeaders.indexOf("NAME");

        if (nameIndex === -1 || !nameDataRow[nameIndex]) {
            geographyNameElement.textContent = "Error: Unable to retrieve the geography name.";
        } else {
            geographyNameElement.textContent = `${nameDataRow[nameIndex]}`; // Geography Name
        }

        // Display results for each matching index
        for (const index of matchingIndices) {
            const header = headers[index];
            const headerBox = document.createElement('div');
            headerBox.className = "header-box";
            headerBox.innerHTML = `<strong>Header:</strong> ${header}<br>Loading metadata...`;
            outputDiv.appendChild(headerBox);

            // Fetch metadata for the header
            const metadataUrl = `${endpoint.split('?')[0]}/variables/${header}.json`;
            try {
                const metadataResponse = await fetch(metadataUrl);
                if (!metadataResponse.ok) throw new Error("Metadata fetch failed.");

                const metadata = await metadataResponse.json();
                const variableUrl = `${endpoint.split('?')[0]}?get=NAME,${header}&ucgid=${encodeURIComponent(new URL(endpoint).searchParams.get('ucgid'))}`;
                headerBox.innerHTML = `
                    <strong>Variable:</strong> <a href="${variableUrl}" target="_blank">${header}</a><br>
                    <strong>Label:</strong> ${metadata.label}<br>
                    <strong>Concept:</strong> ${metadata.concept}<br>
                    <strong>Attributes:</strong> ${metadata.attributes}
                `;
            } catch (err) {
                headerBox.innerHTML = `
                    <strong>Variable:</strong> ${header}<br>
                    <strong>Error:</strong> Failed to fetch metadata.
                `;
            }
        }
    } catch (error) {
        console.error(error);
        geographyNameElement.textContent = `Error: ${error.message}`;
    }
});
