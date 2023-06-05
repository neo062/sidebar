async function getParentList(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.categoryList;
    } catch (error) {
        // Handle any errors that occurred during the fetch or parsing of data
        console.error('Error:', error);
        return null;
    }
}

export default getParentList;
