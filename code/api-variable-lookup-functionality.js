document.getElementById('fetchButton').addEventListener('click', async () => {
    const endpoint = document.getElementById('endpoint').value.trim();
    const searchValue = document.getElementById('searchValue').value.trim();
    const outputDiv = document.getElementById('output');
    const geographyNameElement = document.getElementById('geography-name');

    // Clear previous results
    const resultContent = document.querySelectorAll('#output > div.header-box');
    resultContent.forEach(element => element.remove());
    geographyNameElement.textContent = ""; // Clear geography name

    if (!endpoint || !searchValue) {
        geographyNameElement.textContent = "Error: API endpoint and search value are required.";
        return;
    }

    try {
        // Fetch data from API
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch the API data.");

        const data = await response.json();
        const headers = data[0];
        const dataRow = data[1];

        // Find matching indices
        const matchingIndices = [];
        dataRow.forEach((value, index) => {
            if (value === searchValue) matchingIndices.push(index);
        });

        if (matchingIndices.length === 0) {
            geographyNameElement.textContent = "Error: Search value not found in data row.";
            return;
        }

        // Fetch and display geography name
        const ucgid = new URL(endpoint).searchParams.get('ucgid');
        const nameEndpoint = endpoint.replace(/\?.*/, `?get=NAME&ucgid=${encodeURIComponent(ucgid)}`);
        const nameResponse = await fetch(nameEndpoint);

        if (!nameResponse.ok) throw new Error("Failed to fetch geography name.");
        const nameJson = await nameResponse.json();
        const nameIndex = nameJson[0].indexOf("NAME");
        geographyNameElement.textContent = nameIndex !== -1 ? `Geography Name: ${nameJson[1][nameIndex]}` : "Error: Unable to retrieve geography name.";

        // Display results
        for (const index of matchingIndices) {
            const header = headers[index];
            const headerBox = document.createElement('div');
            headerBox.className = "header-box";

            const variableUrl = `${endpoint.split('?')[0]}?get=NAME,${header}&ucgid=${encodeURIComponent(ucgid)}`;
            headerBox.innerHTML = `
                <strong>Variable:</strong> <a href="${variableUrl}" target="_blank">${header}</a><br>
                <strong>Label:</strong> Loading...<br>
                <strong>Concept:</strong> Loading...
            `;
            outputDiv.appendChild(headerBox);

            // Fetch metadata
            const metadataUrl = `${endpoint.split('?')[0]}/variables/${header}.json`;
            try {
                const metadataResponse = await fetch(metadataUrl);
                if (!metadataResponse.ok) throw new Error();

                const metadata = await metadataResponse.json();
                headerBox.innerHTML = `
                    <strong>Variable:</strong> <a href="${variableUrl}" target="_blank">${header}</a><br>
                    <strong>Label:</strong> ${metadata.label}<br>
                    <strong>Concept:</strong> ${metadata.concept}
                `;
            } catch {
                headerBox.innerHTML += `<strong>Error:</strong> Unable to fetch metadata.`;
            }
        }
    } catch (error) {
        geographyNameElement.textContent = `Error: ${error.message}`;
    }
});
